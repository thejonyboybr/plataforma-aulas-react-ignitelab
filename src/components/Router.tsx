import { Route, Routes } from "react-router-dom";
import { Event } from "../pages/Event";
import Index from "../pages/Index";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/event" element={<Event />} />
      <Route path="/event/lesson/:slug" element={<Event />} />
    </Routes>
  );
}

export default Router;
