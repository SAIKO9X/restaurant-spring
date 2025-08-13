import { Route, Routes } from "react-router-dom";
import { ProfileNavigation } from "../components/Profile/ProfileNavigation";
import { UserProfile } from "../components/Profile/UserProfile";
import { Orders } from "../components/Profile/Orders";
import { Address } from "../components/Profile/Address";
import { Favorites } from "../components/Profile/Favorites";
import { Payments } from "../components/Profile/Payments";
import { Notifications } from "../components/Profile/Notifications";

export const Profile = () => {
  return (
    <section className="lg:flex justify-between">
      <div className="sticky h=[80vh] lg:w-1/5">
        <ProfileNavigation />
      </div>

      <div className="lg:w-4/5">
        <Routes>
          <Route path="/" element={<UserProfile />}></Route>
          <Route path="/pedidos" element={<Orders />}></Route>
          <Route path="/endereços" element={<Address />}></Route>
          <Route path="/favoritos" element={<Favorites />}></Route>
          <Route path="/pagamentos" element={<Payments />} />
          <Route path="/notificações" element={<Notifications />} />
        </Routes>
      </div>
    </section>
  );
};
