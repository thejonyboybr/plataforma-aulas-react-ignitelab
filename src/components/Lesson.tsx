import { CheckCircle, Lock } from "phosphor-react";
import { isPast, format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { Link, useParams } from "react-router-dom";
import classNames from "classnames";

interface LessonProps {
  title: string;
  slug: string;
  availableAt: Date;
  type: "live" | "class";
}

export function Lesson(props: LessonProps) {
  const { slug } = useParams<{ slug: string }>();
  const isLessonAvailable = isPast(props.availableAt);
  const dayFormatted = format(props.availableAt, "EEEE' • 'd'", {
    locale: ptBR,
  });
  const monthAndTimeFormatted = format(props.availableAt, "MMMM' • 'kk':'mm", {
    locale: ptBR,
  });

  const isLessonActive = slug === props.slug;

  return (
    <div>
      <div>
        <span className="text-gray-300 capitalize">{dayFormatted}</span>
        <span className="text-gray-300"> de </span>
        <span className="text-gray-300 capitalize">
          {monthAndTimeFormatted}
        </span>
      </div>
      <Link to={`/event/lesson/${props.slug}`}>
        <div
          className={classNames(
            "rounded border border-gray-500 p-4 mt-2 hover:border-green-500",
            {
              "bg-green-500": isLessonActive,
            }
          )}
        >
          <header className="flex items-center justify-between">
            {isLessonAvailable ? (
              <span
                className={classNames("text-sm  font-medium flex gap-2", {
                  "text-white": isLessonActive,
                  "text-blue-500": !isLessonActive,
                })}
              >
                <CheckCircle size={20} />
                Conteúdo liberado
              </span>
            ) : (
              <span className="text-sm text-orange-500 font-medium flex gap-2">
                <Lock size={20} />
                Em breve
              </span>
            )}
            <span
              className={classNames(
                "min-w-fit text-xs rounded px-2 py-[2px] text-white border  font-bold",
                {
                  "border-white": isLessonActive,
                  "border-green-300": !isLessonActive,
                }
              )}
            >
              {props.type === "live" ? "AO VIVO" : "AULA PRÁTICA"}
            </span>
          </header>
          <strong
            className={classNames("mt-5 block", {
              "text-white": isLessonActive,
              "text-gray-200": !isLessonActive,
            })}
          >
            {props.title}
          </strong>
        </div>
      </Link>
    </div>
  );
}
