import {
  CaretRight,
  DiscordLogo,
  FileArrowDown,
  Image,
  Lightning,
} from "phosphor-react";
import ReactPlayer from "react-player";
import { useGetLessonBySlugQuery } from "../graphql/generated";

interface VideoProps {
  lessonSlug: string;
}

export function Video(props: VideoProps) {
  const { data } = useGetLessonBySlugQuery({
    variables: { slug: props.lessonSlug },
  });

  if (!data || !data.lesson) {
    return (
      <div className="w-full">
        <div className="flex justify-center">
          <div className="bg-gray-500 rounded animate-pulse h-full w-full max-w-[1100px] max-h-[60vh] aspect-video "></div>
        </div>

        <div className="p-4 w-[1130px] mx-auto">
          <div className="flex items-start flex-wrap justify-center gap-16">
            <div className="flex-1">
              <div className="bg-gray-500 rounded animate-pulse w-full h-10" />
              <div className="bg-gray-500 rounded animate-pulse w-full h-20 mt-4" />
              <div className="flex items-center gap-4 mt-6">
                <div className="bg-gray-500 rounded-full animate-pulse w-16 h-16" />
                <div className="bg-gray-500 rounded animate-pulse w-full h-16" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="bg-black flex justify-center">
        <div className="h-full w-full max-w-[1100px] max-h-[60vh] aspect-video ">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${data.lesson.videoId}`}
            width="100%"
            height="100%"
            controls={true}
          />
        </div>
      </div>

      <div className="p-4 max-w-[1100px] mx-auto">
        <div className="flex items-start flex-wrap justify-center gap-16">
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{data.lesson.title}</h1>
            <p className="mt-4 text-gray-200 leading-relaxed">
              {data.lesson.description}
            </p>
            {data.lesson.teacher && (
              <div className="flex items-center gap-4 mt-6">
                <img
                  className="h-16 w-16 rounded-full border-[3px] border-blue-500"
                  src={data.lesson.teacher.avatarURL}
                  alt="icone-professor"
                />
                <div className="leading-relaxed">
                  <strong className="font-bold text-2xl block">
                    {data.lesson.teacher.name}
                  </strong>
                  <span className="text-gray-200 text-sm block">
                    {data.lesson.teacher.bio}
                  </span>
                </div>
              </div>

            )}
          </div>

          <div className="flex flex-col gap-4 buttons">
            <a href="" className="button-green">
              <DiscordLogo size={24} />
              Comunidade do Discord
            </a>
            <a href="" className="button-blue">
              <Lightning size={24} />
              Acesse o desafio
            </a>
          </div>
        </div>

        <div className="gap-8 mt-20 flex justify-center buttons">
          <a
            href=""
            className="bg-gray-700 rounded overflow-hidden flex hover:bg-gray-600 transition-colors buttons2"
          >
            <div className="bg-green-700 h-full p-6 flex items-center justify-center button-icone">
              <FileArrowDown size={40} />
            </div>
            <div className="p-6 flex-1 leading-relaxed button-content">
              <strong className="text-2xl">Material complementar</strong>
              <p className="text-sm text-gray-200 mt-2">
                Acesse o material complementar para acelerar o seu
                desenvolvimento
              </p>
            </div>
            <div className="h-full p-6 flex items-center button-arrow">
              <CaretRight size={24} />
            </div>
          </a>
          <a
            href=""
            className="bg-gray-700 rounded overflow-hidden flex hover:bg-gray-600 transition-colors buttons2"
          >
            <div className="bg-green-700 h-full p-6 flex items-center justify-center button-icone">
              <Image size={40} />
            </div>
            <div className="p-6 flex-1 leading-relaxed button-content">
              <strong className="text-2xl">Wallpapers exclusivos</strong>
              <p className="text-sm text-gray-200 mt-2">
                Baixe wallpapers exclusivos do Ignite Lab e personalize a sua
                máquina
              </p>
            </div>
            <div className="h-full p-6 flex items-center button-arrow">
              <CaretRight size={24} />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
