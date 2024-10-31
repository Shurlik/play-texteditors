import { getColor } from "@/utils/getColor";

const colors = {
  background: getColor("background"),
  white: getColor("white"),
  darkGrey42: getColor("darkGrey42"),
  grey3: getColor("grey3"),
  orange: getColor("orange"),
  mainGreen: getColor("mainGreen"),
};

const dataGrid = {
  styleOverrides: {
    root: {
      backgroundColor: colors.background,
      // borderRadius: '1.5rem',
      border: "none",
      "& .MuiDataGrid-columnHeaders": {
        backgroundColor: colors.background,
        // color: colors.white,
        // fontSize: '1.3rem',
        // fontWeight: 700,
      },
      "& .MuiDataGrid-columnHeader": {
        backgroundColor: colors.background,
        color: colors.white,
        fontSize: "1.4rem",
        fontWeight: 700,
        letterSpacing: 2.5,
        fontFamily: "Bebas Neue",
      },
      "& .MuiDataGrid-cell": {
        borderTop: `none`,
        // borderBottom: `1px solid ${colors.darkGrey42}`,
        color: colors.white,
        whiteSpace: "normal",
        wordWrap: "break-word",

        fontSize: "1rem",
        fontWeight: "400",
        "&:focus": {
          outline: "none", // Убираем стандартный фокус
          border: `2px solid ${colors.orange}`, // Устанавливаем нужный цвет бордера
        },
      },
      "& .MuiDataGrid-container--top": {
        // backgroundColor: colors.mainGreen,
      },
      "& .MuiDataGrid-row": {
        borderBottom: `1px solid ${colors.darkGrey42}`,
        borderTop: `none`,

        "&:hover": {
          backgroundColor: `${colors.grey3}30`,
        },
      },
      "& .MuiCheckbox-root": {
        color: colors.white,
        "&.Mui-checked": {
          color: colors.white,
        },
      },
      "& .MuiDataGrid-columnSeparator": {
        display: "none",
      },
      "& .MuiDataGrid-selectedRowCount": {
        color: colors.mainGreen,
      },
      "& .MuiDataGrid-menuIcon": {
        color: colors.white,
      },
      "& .MuiDataGrid-toolbarContainer": {
        padding: "2rem",
      },
      "& .MuiTablePagination-root": {
        color: colors.white,
      },
      "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
        {
          color: colors.mainGreen,
          marginBottom: 0,
        },
      "& .MuiTablePagination-select": {
        color: colors.orange,
      },
      "& .MuiTablePagination-actions": {
        color: colors.mainGreen,
      },
      "& .MuiDataGrid-columnHeaderTitleContainer": {
        // color: '#f50057', // Color for title
      },
      "& .MuiDataGrid-sortIcon": {
        color: colors.orange, // Color for sort icon
      },
      "& .MuiDataGrid-menuIconButton": {
        color: colors.orange, // Color for menu icon
      },
      "& .MuiDataGrid-filterIcon": {
        color: colors.orange, // Color for icon filter
      },
      "& .MuiDataGrid-footerContainer": {
        minHeight: "75px",
        alignItems: "center", // Set up min height for footer
      },
    },
  },
  defaultProps: {
    // disableColumnMenu: true,
    // disableColumnFilter: true,
    // disableColumnSelector: true,
    // disableDensitySelector: true,
    // disableExtendRowFullWidth: true,
  },
};

export default dataGrid;
