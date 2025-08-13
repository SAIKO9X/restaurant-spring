import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, List, ListItem, ListItemText } from "@mui/material";
import { getUsersNotifications } from "../../state/Order/Action";

export const Notifications = () => {
  const dispatch = useDispatch();
  const { order } = useSelector((store) => store);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(getUsersNotifications());
    }, 30000);
    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <section>
      <Typography variant="h4" gutterBottom>
        Notificações
      </Typography>
      <List>
        {order.notifications.map((notification) => (
          <ListItem key={notification.id}>
            <ListItemText
              primary={notification.message}
              secondary={notification.createdAt}
            />
          </ListItem>
        ))}
      </List>
    </section>
  );
};
