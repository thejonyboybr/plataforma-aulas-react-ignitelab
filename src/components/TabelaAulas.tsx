import { gql, useQuery } from "@apollo/client";

export function TabelaAulas() {
  const GET_LESSONS_QUERY = gql`
    query {
      lessons {
        id
        title
        description
        teacher {
          id
          name
        }
        lessonType
        videoId
      }
    }
  `;

  interface Lesson {
    teacher: { id: string; name: string };
    id: string;
    title: string;
    description: string;
    lessonType: string;
    videoId: string;
  }

  const { data } = useQuery<{ lessons: Lesson[] }>(GET_LESSONS_QUERY);

  return (
    <div className="overflow-auto rounded shadow ">
      <table>
        <thead className="bg-zinc-500 border-b-2 border-zinc-300 whitespace-nowrap">
          <tr>
            <th className="p-3 text-lg font-semibold tracking-wide text-center whitespace-nowrap">
              Nome da aula
            </th>
            <th className="p-3 text-lg font-semibold tracking-wide text-center">
              Descricao da aula
            </th>
            <th className="p-3 text-lg font-semibold tracking-wide text-center whitespace-nowrap">
              Nome do professor
            </th>
            <th className="p-3 text-lg font-semibold tracking-wide text-center whitespace-nowrap">
              Tipo de aula
            </th>
            <th className="p-3 text-lg font-semibold tracking-wide text-center">
              Link
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.lessons.map((lesson) => {
            let lessonType: string =
              lesson.lessonType === "live" ? "Ao vivo" : "Gravada";
            let lessonTypeStyle: string =
              lesson.lessonType === "live"
                ? "p-3 text-center font-bold text-red-500"
                : "p-3 text-center";
            let url: string = `https://www.youtube.com/watch?v=${lesson.videoId}`;
            return (
              <tr className="table-row">
                <td className="p-3 text-center">{lesson.title}</td>
                <td className="p-3 text-center">{lesson.description}</td>
                <td className="p-3 text-center">{lesson.teacher.name}</td>
                <td className={lessonTypeStyle}>{lessonType}</td>
                <td className="p-3">
                  <a
                    className="font-bold text-blue-500 hover:underline"
                    href={url}
                    target="blank"
                  >
                    Abrir
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
