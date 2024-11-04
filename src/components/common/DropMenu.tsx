import { getColor } from "@/utils/getColor";
import { ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";

interface DropMenuProps {
  onClose: () => void;
  open: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  anchorEl: HTMLElement | null;
  disabled?: boolean;
  isAdmin?: boolean;
}

const colors = {
  white: getColor("white"),
  backgroundMain: getColor("backgroundMain"),
  background: getColor("background"),
  orange: getColor("orange"),
};

const DropMenu: React.FC<DropMenuProps> = ({
  open,
  onClose,
  data,
  anchorEl,
  isAdmin = false,
}) => {
  if (!open) return null;

  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
    >
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {data.map((d: any) => {
        if (d.admin && !isAdmin) {
          return null; 
        }
        const Icon = d.icon;
        const fn = d.fn;
        return (
          <MenuItem
            disabled={d.disabled}
            sx={{
              color: colors.white,
              backgroundColor: colors.backgroundMain,
              "&:hover": {
                backgroundColor: colors.background,
                color: colors.orange,
              },
            }}
            key={d.title}
            onClick={() => {
              if (!d.disabled) {
          
                fn();
                onClose();
              }
            }}
          >
            <ListItemText
              sx={
                d.color
                  ? {
                      "& .MuiListItemText-primary": { color: d.color },
                    }
                  : {
                      "& .MuiListItemText-primary": {
                        color: "inherit",
                      },
                    }
              }
            >
              {d.title}
            </ListItemText>
            <ListItemIcon
              sx={{
                justifyContent: "end",
                color: d.color ? d.color : "inherit",
              }}
            >
              <Icon fontSize="small" sx={{ color: "inherit" }} />
            </ListItemIcon>
          </MenuItem>
        );
      })}
    </Menu>
  );
};

export default DropMenu;
