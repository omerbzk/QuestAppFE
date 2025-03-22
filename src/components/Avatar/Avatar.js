import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Modal,
  Typography,
  Avatar as MuiAvatar,
  Radio,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles({
  root: {
    marginLeft: "20px",
    width: "100%",
  },
});

function Avatar(props) {
  const {avatarId} = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = React.useState(avatarId); // Başlangıçta bir avatar seçili

  const handleToggle = (value) => {
    setChecked(value); // Sadece bir avatarın seçilmesini sağlıyoruz
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: 2, // Köşeleri yuvarlatıyoruz
    boxShadow: 24, // Daha modern bir gölge
    p: 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 2, // Elemanlar arasında boşluk
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Card className={classes.root} sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          sx={{ objectFit: "contain" }}
          image={`/avatars/avatar${checked}.png`} // Seçilen avatarı gösteriyoruz
          title="User Avatar"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Username
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            User Bio
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={handleOpen} size="small">
            Change Avatar
          </Button>
        </CardActions>
      </Card>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Select Your Avatar
          </Typography>
          <List
            dense
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            {[1, 2, 3, 4].map((value) => {
              // avatar0'ı listelemiyoruz, 1'den başlıyoruz
              const labelId = `radio-list-secondary-label-${value}`;
              return (
                <ListItem key={value} disablePadding>
                  <ListItemButton onClick={() => handleToggle(value)}>
                    <ListItemAvatar>
                      <MuiAvatar
                        alt={`Avatar n°${value}`}
                        src={`/avatars/avatar${value}.png`} // avatar0 yerine avatar1'den başlıyor
                      />
                    </ListItemAvatar>
                    <ListItemText
                      id={labelId}
                      primary={`User Avatar ${value}`}
                    />
                    <Radio
                      edge="end"
                      checked={checked === value} // Correctly checks the selected avatar
                      onChange={() => handleToggle(value)} // Updates the selected avatar
                      value={value}
                      name="avatar-radio-group"
                      inputProps={{ "aria-labelledby": labelId }}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
          <Button
            variant="contained"
            color="primary"
            onClick={handleClose}
            sx={{ mt: 2 }}
          >
            Save
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default Avatar;
