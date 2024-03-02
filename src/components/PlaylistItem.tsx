import { type Playlist, type Song } from "@/pages/api/me/artists.js";
import CardPlayButton from "./CardPlayButton.jsx";
import { type Playlist as TruePlaylist } from "@/types/playlists";
// import { usePlayStore } from "@/store/playerStore.js";
interface Props {
  playlist?: any;
  songs: Song[];
  truePlaylist?: TruePlaylist;
}
function PlaylistItem({ playlist, songs, truePlaylist }: Props) {
  const { id, albumId, cover, title, artists, color } = playlist!;
  const song = songs[0];
  const artistasString = artists.join(", ");

  return (
    <section className="bg-[#121212]">
      {truePlaylist ? (
        <article className="group relative">
          <div className="absolute z-10 right-5 bottom-[70px] opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-[-9px]">
            <CardPlayButton
              id={truePlaylist.id}
              playlist={truePlaylist.tracks}
              song={song}
              songs={songs}
            />
          </div>
          <a
            href={`/playlist/${truePlaylist.id}`}
            className="playlist-item p-4 w-[209px] flex flex-col relative overflow-hidden gap-5 rounded-lg bg-[#121212] hover:bg-zinc-800"
          >
            <picture className="h-auto w-[177px]  flex-none">
              <img
                src={truePlaylist.images[0].url}
                alt={`Cover of ${truePlaylist.name} by ${truePlaylist.description}`}
                className="object-cover w-[177px] h-auto  rounded-[4px]"
              />
            </picture>
            <div className="px-0 flex flex-auto flex-col truncate justify-start">
              <h4 className="text-[#E9E9E9] text-sm font-semibold pb-1">
                {truePlaylist.name}
              </h4>
              <span className="text-xs text-[#949494]">
                {truePlaylist.description}
              </span>
            </div>
          </a>
        </article>
      ) : (
        <article className="group relative">
          <div className="absolute z-10 right-5 bottom-[70px] opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-[-9px]">
            <CardPlayButton
              id={albumId}
              playlist={playlist}
              song={song}
              songs={songs}
            />
          </div>
          <a
            href={`/playlist/${id}`}
            className="playlist-item p-4 w-[209px] flex flex-col relative overflow-hidden gap-5 rounded-lg bg-[#121212] hover:bg-zinc-800"
          >
            <picture className="h-auto w-[177px]  flex-none">
              <img
                src={cover}
                alt={`Cover of ${title} by ${artistasString}`}
                className="object-cover w-[177px] h-auto  rounded-[4px]"
              />
            </picture>
            <div className="px-0 flex flex-auto flex-col truncate justify-start">
              <h4 className="text-[#E9E9E9] text-sm font-semibold pb-1">
                {title}
              </h4>
              <span className="text-xs text-[#949494]">{artistasString}</span>
            </div>
          </a>
        </article>
      )}
    </section>
  );
}

export default PlaylistItem;
