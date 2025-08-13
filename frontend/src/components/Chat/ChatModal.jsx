import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Modal,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Divider,
  Paper,
} from "@mui/material";
import { Send } from "@mui/icons-material";
import { getChatMessages, sendMessage } from "../../state/Chat/Action";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const ChatModal = ({ open, handleClose, chat }) => {
  const dispatch = useDispatch();
  const { messages } = useSelector((store) => store.chat);
  const { auth } = useSelector((store) => store.auth);
  const [messageContent, setMessageContent] = useState("");

  useEffect(() => {
    if (chat?.id) {
      dispatch(getChatMessages(chat.id));
    }
  }, [chat, dispatch]);

  const handleSendMessage = () => {
    if (messageContent.trim()) {
      dispatch(sendMessage({ chatId: chat.id, content: messageContent }));
      setMessageContent("");
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h5">Chat com {chat?.restaurant?.name}</Typography>
        <Divider sx={{ my: 1 }} />
        <Paper elevation={0} sx={{ height: 400, overflow: "auto", mb: 2 }}>
          <List>
            {messages.map((msg) => (
              <ListItem
                key={msg.id}
                sx={{
                  justifyContent:
                    msg.sender.id === auth.user.id ? "flex-end" : "flex-start",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  {msg.sender.id !== auth.user.id && (
                    <Avatar>{msg.sender.fullName[0]}</Avatar>
                  )}
                  <ListItemText
                    primary={msg.content}
                    secondary={msg.sender.fullName}
                  />
                  {msg.sender.id === auth.user.id && (
                    <Avatar>{auth.user.fullName[0]}</Avatar>
                  )}
                </Box>
              </ListItem>
            ))}
          </List>
        </Paper>
        <Box sx={{ display: "flex", gap: 1 }}>
          <TextField
            fullWidth
            value={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
            label="Escreva uma mensagem..."
          />
          <Button
            variant="contained"
            onClick={handleSendMessage}
            endIcon={<Send />}
          >
            Enviar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
