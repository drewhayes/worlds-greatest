import {createClient} from "../../prismicio";
import {PrismicRichText} from "@prismicio/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faMask, faMagnifyingGlass, faUserSecret } from "@fortawesome/free-solid-svg-icons";

export default function Character({character, flags}) {

    if(!flags.isGameReady)
    {
        return (
            <div className="flex flex-col justify-center items-center w-screen min-h-screen bg-gray-200">
                <div className="bg-white rounded-lg p-8 shadow-lg text-center space-y-5">
                    <FontAwesomeIcon icon={faUserSecret} className="text-teal text-8xl" />

                    <h1>{character.name}</h1>
                    <b className="animate-pulse rounded-full bg-teal text-white py-2 px-4">Please wait. The game will start soon...</b>
                </div>
            </div>
        )
    }

    const teamStyle = {
        detective: {
            background: "gradient-detective",
            icon:       faMagnifyingGlass,
            bgColor:    "bg-teal",
            textColor:  "text-teal",
            bioLabel:   "Who You Are",
            storyLabel: "Why You Came"
        },
        imposter: {
            background: "gradient-imposter",
            icon:       faMask,
            bgColor:    "bg-tyrian-purple",
            textColor:  "text-tyrian-purple",
            bioLabel:   "Your Backstory",
            storyLabel: "Your Secret"
        },
    };

    const style = teamStyle[character.team.toLowerCase()];

    return (
        <div className="w-screen min-h-screen bg-gray-200">
            <div className="flex-col bg-white max-w-xl container mx-auto md:shadow-lg">
                <div className={ "flex justify-center items-center p-8 h-[30vh] " + style.background }>
                    <div className="flex w-full mx-auto space-x-5 items-center">
                        <div className="flex-col w-20 h-20 text-center rounded-lg overflow-clip shadow-md">
                            <div className={"h-2/3 p-2 " + style.bgColor}>
                                <FontAwesomeIcon icon={style.icon} className="w-full h-full text-white" />
                            </div>
                            <div className={"flex items-center justify-center bg-white text-sm font-bold h-1/3 " + style.textColor}>
                                {character.team}
                            </div>
                        </div>
                        <div className="grow text-white">
                            <strong className="text-4xl">{character.name}</strong><br/>
                            <PrismicRichText field={character.subtitle} />
                        </div>
                    </div>
                </div>
                <div className="p-5 space-y-5 flex-1">
                    <div>
                        <h4>{style.bioLabel}</h4>
                        <div className="p-5 rounded-lg bg-gray-200">
                            <PrismicRichText field={character.biography} />
                        </div>
                    </div>

                    <div>
                        <h4>{style.storyLabel}</h4>
                        <div className="p-5 rounded-lg bg-gray-200">
                            <PrismicRichText field={character.backgroundStory} />
                        </div>
                    </div>
                </div>
                <div className={"h-8 w-full text-sm text-right " + style.background}>
                </div>
            </div>
        </div>
    )
}

export async function getStaticProps({previewData, params}) {

    const client = createClient({ previewData });
    const character = await client.getByUID('character', params.uid);
    const flags = await client.getSingle("flags");

    return {
        props: {
            character:  character.data,
            flags:      flags.data
        }
    }
}

export async function getStaticPaths() {

    const client = createClient();
    const characters = await client.getAllByType("character");

    return {
        paths: characters.map(character => {
            return {
                params: {
                    uid:    character.uid
                }
            }
        }),
        fallback: false
    }
}