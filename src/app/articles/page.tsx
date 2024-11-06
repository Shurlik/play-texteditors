"use client";
import moment from "moment";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import useSWR from "swr";

import { deleteArticle, getArticles } from "@/api/services/airtableService";
import { Box, Button, Container } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { paginationModel } from "@/utils/helpers";
import { getColor } from "@/utils/getColor";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import DownloadIcon from "@mui/icons-material/Download";
import DrawerContentDisplay from "@/components/common/DrawerContentDisplay";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DropMenu from "@/components/common/DropMenu";
import FullPageLoader from "@/components/common/FullPageLoader";
import Loader from "@/components/common/Loader";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import PageHeader from "@/components/common/PageHeader";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

interface Article {
  id: string;
  fields: {
    "Blog Title": string;
    "AI Final Output (Blogpost)": string;
    "Article Image": string;
    "Created Time": string;
  };
  user: { name: string };
}

interface ArticlesResponse {
  articles: Article[];
}

// const localStyles = {
//   alignItems: "center",
//   borderRadius: ".4rem",
//   padding: ".6rem 0",
//   color: colors.mainGreen,
//   transition: ".5s",
//   "&:hover": {
//     backgroundColor: colors.backgroundMain,
//     color: colors.orange,
//   },
//   "&.Mui-selected": {
//     backgroundColor: colors.backgroundMain,
//     color: colors.orange,
//     "&:hover": {
//       backgroundColor: colors.backgroundMain,
//     },
//   },
// };

const colors = {
  orange: getColor("orange"),
  red: getColor("red"),
};

const ArticlesPage: React.FC = () => {
  const router = useRouter(); // Use Next.js router

  const { data = {}, mutate } = useSWR<ArticlesResponse>(
    "/cos/articles",
    getArticles
  );

  const [listArticlesToDelete, setListArticleToDelete] = useState<string[]>([]);
  const [selected, setSelected] = useState<Article | null>(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [loading, setLoading] = React.useState(false);
  const [id, setId] = useState<string | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>, id: string) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setId(null);
  };

  const open = Boolean(anchorEl);

  if (!data?.articles) {
    return <Loader />;
  }

  const editHandler = () => {
    /* Edit functionality here */
  };

  const downloadHandler = () => {
    /* Download functionality here */
  };

  const articles = data.articles.map((d) => ({
    id: d.id,
    title: d.fields["Blog Title"],
    content: d.fields["AI Final Output (Blogpost)"],
    image: d.fields["Article Image"],
    created: d.fields["Created Time"],
    user: d.user,
  }));

  const columns = [
    { field: "title", headerName: "Title", flex: 3 },
    { field: "owner", headerName: "Owner", flex: 1 },
    {
      flex: 1,
      field: "view",
      type: "actions",
      headerName: "Click to View",
      getActions: (params) => [
        <GridActionsCellItem
          key={params.id}
          icon={<RemoveRedEyeIcon sx={{ color: colors.orange }} />}
          label="Action"
          onClick={(event) => {
            event.stopPropagation();
            const article = articles?.find(
              (article) => article.id === params.id
            );
            setSelected(article || null);
          }}
        />,
      ],
    },
    {
      field: "created",
      headerName: "Created at",
      flex: 1,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      getActions: (params) => [
        <GridActionsCellItem
          key={params.id}
          icon={<MoreVertIcon sx={{ color: colors.orange }} />}
          label="Action"
          onClick={(event) => {
            event.stopPropagation();
            setId(params.id);
            handleClick(event);
          }}
        />,
      ],
    },
  ];

  const handleSelectionChange = (data: string[]) => {
    setListArticleToDelete([...data]);
  };

  const groupDeleteHandler = async () => {
    if (!listArticlesToDelete?.length) {
      return;
    }
    if (window.confirm("Are you sure you want to delete these Articles?")) {
      setLoading(true);
      try {
        for (const p of listArticlesToDelete) {
          await deleteArticle(p);
        }
        await mutate();
        toast.success("Deleted successfully!");
        setListArticleToDelete([]);
      } catch (e) {
        toast.error("Something went wrong");
        console.log("Article delete error: ", e);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDeleteArticle = async () => {
    if (!id) {
      return;
    }
    if (window.confirm("Are you sure you want to delete this Article?")) {
      setLoading(true);
      try {
        await deleteArticle(id);
        await mutate();
        toast.success("Deleted successfully!");
        setId(null);
        setAnchorEl(null);
      } catch (e) {
        toast.error("Something went wrong");
        console.log("Article delete error: ", e);
      } finally {
        setLoading(false);
      }
    }
  };

  const rows = articles.map((a) => ({
    id: a.id,
    title: a?.title,
    owner: a?.user?.name,
    created: moment(a.created).format("YYYY-MM-DD"),
  }));

  const shortsHandler = () => {
    router.push({
      pathname: "/shorts/create",
      query: { articleId: id },
    });
  };

  const MENU_DATA = [
    { title: "Create Shorts", icon: NoteAddIcon, fn: shortsHandler },
    {
      title: "Edit",
      icon: DriveFileRenameOutlineIcon,
      fn: editHandler,
      disabled: true,
    },
    {
      title: "Download",
      icon: DownloadIcon,
      fn: downloadHandler,
      disabled: true,
    },
    {
      title: "Delete",
      icon: DeleteOutlinedIcon,
      fn: handleDeleteArticle,
      color: colors.red,
    },
  ];

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <PageHeader header={"Articles"} />
        {listArticlesToDelete.length > 0 && (
          <Button
            variant={"contained"}
            color={"primary"}
            onClick={groupDeleteHandler}
          >
            Delete selected
          </Button>
        )}
      </Box>
      <DataGrid
        disableColumnFilter
        rowSelectionModel={listArticlesToDelete}
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[10, 20]}
        checkboxSelection
        rowHeight={75}
        disableColumnSelector
        disableRowSelectionOnClick
        onRowSelectionModelChange={handleSelectionChange}
      />
      <DrawerContentDisplay {...{ selected, setSelected }} />
      <DropMenu
        onClose={handleClose}
        open={Boolean(anchorEl)}
        data={MENU_DATA}
        anchorEl={anchorEl}
      />
      {loading && <FullPageLoader />}
    </Container>
  );
};

export default ArticlesPage;
