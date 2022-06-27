import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { Video } from "../components/Video";
import { SidebarMobile } from "../components/SidebarMobile";
import { useMediaQuery } from "../utils/useMediaQuery";
import { useParams } from "react-router-dom";

export function Event() {
  const { slug } = useParams<{ slug: string }>();

  const matches = useMediaQuery("(max-width: 768px)");

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex w-screen">
        {slug ? <Video lessonSlug={slug} /> : <div className="w-full" />}
        {matches ? <SidebarMobile /> : <Sidebar />}
      </main>
    </div>
  );
}
