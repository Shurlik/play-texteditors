import {
  Box,
  Button,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";

import { getColor } from "@/utils/getColor";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import DownloadIcon from "@mui/icons-material/Download";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import DropMenu from "../common/DropMenu";

interface Article {
  id: string;
  title: string;
  user: {
    name: string;
  };
}

interface ArticlesListProps {
  articles: Article[];
  handleDeleteArticle: (id: string) => void;
  listArticlesToDelete: string[];
  setListArticleToDelete: React.Dispatch<React.SetStateAction<string[]>>;
  disabled: boolean;
  setSelected: React.Dispatch<React.SetStateAction<Article | null>>;
}

const colors = {
  red: getColor("red"),
  grey3: getColor("grey3"),
  white: getColor("white"),
  background: getColor("background"),
};

const ArticlesList: React.FC<ArticlesListProps> = ({
  articles,
  handleDeleteArticle,
  listArticlesToDelete,
  setListArticleToDelete,
  disabled,
  setSelected,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [id, setId] = useState<string | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<SVGSVGElement>, id: string) => {
    setAnchorEl(event.currentTarget);
    setId(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setId(null);
  };

  const onSelectChange = (checked: boolean, userId: string) => {
    if (checked) {
      setListArticleToDelete((prev) => [...prev, userId]);
    } else {
      setListArticleToDelete((prev) => prev.filter((p) => p !== userId));
    }
  };

  const editHandler = () => {};

  const downloadHandler = () => {};

  const deleteHandler = () => {
    if (id) {
      setAnchorEl(null);
      handleDeleteArticle(id);
      setId(null);
    }
  };

  const MENU_DATA = [
    { title: "Edit", icon: DriveFileRenameOutlineIcon, fn: editHandler },
    { title: "Download", icon: DownloadIcon, fn: downloadHandler },
    {
      title: "Delete",
      icon: DeleteOutlinedIcon,
      fn: deleteHandler,
      color: colors.red,
    },
  ];

  const checkAllHandler = () => {
    setListArticleToDelete(articles.map((article) => article.id));
  };

  const clearAllHandler = () => {
    setListArticleToDelete([]);
  };

  const onMainSelectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.checked ? checkAllHandler() : clearAllHandler();
  };

  return (
    <TableContainer
      sx={{
        backgroundColor: colors.background,
        borderRadius: "1.5rem",
        padding: "2rem",
      }}
    >
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell
              padding={"checkbox"}
              sx={{ borderBottom: `1px solid ${colors.grey3}` }}
            >
              <Checkbox
                disabled={disabled}
                sx={{
                  color: colors.white,
                  "&.Mui-checked": {
                    color: colors.white,
                  },
                }}
                checked={listArticlesToDelete.length === articles.length}
                onChange={onMainSelectChange}
              />
            </TableCell>
            <TableCell sx={{ borderBottom: `1px solid ${colors.grey3}` }}>
              Title
            </TableCell>
            <TableCell sx={{ borderBottom: `1px solid ${colors.grey3}` }}>
              Owner
            </TableCell>
            <TableCell sx={{ borderBottom: `1px solid ${colors.grey3}` }}>
              Action
            </TableCell>
            <TableCell
              sx={{ borderBottom: `1px solid ${colors.grey3}` }}
            ></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {articles.map((article) => (
            <TableRow key={article.id}>
              <TableCell padding={"checkbox"}>
                <Checkbox
                  disabled={disabled}
                  sx={{
                    color: colors.white,
                    "&.Mui-checked": {
                      color: colors.white,
                    },
                  }}
                  checked={listArticlesToDelete.includes(article.id)}
                  onChange={(event) =>
                    onSelectChange(event.target.checked, article.id)
                  }
                />
              </TableCell>
              <TableCell>
                <Box>{article.title}</Box>
              </TableCell>
              <TableCell>{article.user.name}</TableCell>
              <TableCell>
                <Button
                  disabled={disabled}
                  onClick={() => setSelected(article)}
                  variant={"outlined"}
                  color={"secondary"}
                >
                  View Article
                </Button>
              </TableCell>
              <TableCell>
                <MoreVertIcon
                  disabled={disabled}
                  onClick={(event:any) => handleClick(event as React.MouseEvent<SVGSVGElement>, article.id)}
                  sx={{
                    cursor: "pointer",
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <DropMenu
        disabled={disabled}
        onClose={handleClose}
        open={open}
        data={MENU_DATA}
        anchorEl={anchorEl}
      />
    </TableContainer>
  );
};

export default ArticlesList;