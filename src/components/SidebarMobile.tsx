import { List, X } from "phosphor-react";
import { useState } from "react";
import { Lesson } from "./Lesson";
import className from "classnames";
import { useGetLessonsQuery } from "../graphql/generated";

export function SidebarMobile() {
  const { data } = useGetLessonsQuery();
  const [sidebar, setSidebar] = useState(true);
  const showSidebar = () => {
    setSidebar(!sidebar);
  };
  return (
    <div>
      <div className="absolute top-5 right-4">
        {sidebar ? (
          <List
            className="text-4xl text-white cursor-pointer"
            onClick={showSidebar}
          />
        ) : (
          <X
            className="text-4xl text-white cursor-pointer"
            onClick={showSidebar}
          />
        )}
      </div>

      <aside
        className={className(
          "absolute right-0 transition-all duration-300 z-10 top-[75px] w-full h-full bg-gray-700 p-6 border-l border-gray-600",
          { "translate-x-full": sidebar }
        )}
      >
        <span className="font-bold text-2xl pb-6 mb-6 border-b border-gray-500 block">
          Cronograma de aulas
        </span>
        <div className="flex flex-col gap-8">
          {data?.lessons.map((lesson) => {
            return (
              <Lesson
                key={lesson.id}
                title={lesson.title}
                slug={lesson.slug}
                availableAt={new Date(lesson.availableAt)}
                type={lesson.lessonType}
              />
            );
          })}
        </div>
      </aside>
    </div>
  );
}
