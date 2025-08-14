import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getChatMessages,
  getRestaurantsChats,
  sendMessage,
} from "../../state/Chat/Action";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { Send } from "@mui/icons-material";

export const RestaurantChat = () => {
  const dispatch = useDispatch();

  // CORREÇÃO: Selecione apenas os pedaços de estado necessários
  const auth = useSelector((store) => store.auth);
  const { chats, messages } = useSelector((store) => store.chat);

  const [selectedChat, setSelectedChat] = useState(null);
  const [messageContent, setMessageContent] = useState("");

  useEffect(() => {
    dispatch(getRestaurantsChats());
  }, [dispatch]);

  useEffect(() => {
    if (selectedChat) {
      dispatch(getChatMessages(selectedChat.id));
    }
  }, [selectedChat, dispatch]);

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
  };

  const handleSendMessage = () => {
    if (messageContent.trim() && selectedChat) {
      dispatch(
        sendMessage({ chatId: selectedChat.id, content: messageContent })
      );
      setMessageContent("");
    }
  };

  return (
    <Grid container spacing={1} sx={{ p: 2, height: "90vh" }}>
      {/* Lista de Conversas */}
      <Grid item xs={4}>
        <Paper sx={{ height: "100%", overflow: "auto" }}>
          <Typography
            variant="h6"
            sx={{ p: 2, borderBottom: "1px solid #ddd" }}
          >
            Conversas
          </Typography>
          <List>
            {chats.map((chat) => (
              <ListItem
                button
                key={chat.id}
                onClick={() => handleSelectChat(chat)}
                selected={selectedChat?.id === chat.id}
              >
                <ListItemText primary={chat.customer?.fullName} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Grid>

      {/* Área de Mensagens */}
      <Grid item xs={8}>
        <Paper
          sx={{ height: "100%", display: "flex", flexDirection: "column" }}
        >
          {selectedChat ? (
            <>
              <Box sx={{ p: 2, borderBottom: "1px solid #ddd" }}>
                <Typography variant="h6">
                  Chat com {selectedChat.customer?.fullName}
                </Typography>
              </Box>
              <Box sx={{ flexGrow: 1, overflow: "auto", p: 2 }}>
                {messages.map((msg) => (
                  <Box
                    key={msg.id}
                    sx={{
                      mb: 2,
                      display: "flex",
                      justifyContent:
                        msg.sender?.id === auth.user?.id
                          ? "flex-end"
                          : "flex-start",
                    }}
                  >
                    <Paper elevation={3} sx={{ p: 1.5, maxWidth: "70%" }}>
                      <Typography variant="body2">{msg.content}</Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ display: "block", textAlign: "right" }}
                      >
                        {new Date(msg.timestamp).toLocaleTimeString()}
                      </Typography>
                    </Paper>
                  </Box>
                ))}
              </Box>
              <Box
                sx={{
                  p: 2,
                  borderTop: "1px solid #ddd",
                  display: "flex",
                  gap: 1,
                }}
              >
                <TextField
                  fullWidth
                  size="small"
                  value={messageContent}
                  onChange={(e) => setMessageContent(e.target.value)}
                  label="Responder..."
                />
                <Button
                  variant="contained"
                  onClick={handleSendMessage}
                  endIcon={<Send />}
                >
                  Enviar
                </Button>
              </Box>
            </>
          ) : (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <Typography color="text.secondary">
                Selecione uma conversa para começar
              </Typography>
            </Box>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};
