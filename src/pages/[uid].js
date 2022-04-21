import {createClient} from "../../prismicio";
import {PrismicRichText, PrismicText} from "@prismicio/react";
import { Tab } from "@headlessui/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faMask, faMagnifyingGlass, faUserSecret, faHandcuffs } from "@fortawesome/free-solid-svg-icons";

export default function Character({character, flags}) {

    if(!flags.isGameReady)
    {
        return (
            <div className="flex flex-col justify-center items-center w-screen min-h-screen bg-gray-200 p-5">
                <div className="bg-white rounded-lg max-w-sm w-full p-5 shadow-lg text-center space-y-5">
                    <FontAwesomeIcon icon={faUserSecret} className="text-teal text-8xl" />

                    <h1>{character.name}</h1>
                    <b className="animate-pulse rounded-full bg-teal text-white py-2 px-4 text-sm">The game will start soon.</b>
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
                        <div className="flex-col w-20 h-20 text-center rounded-xl overflow-clip shadow-md">
                            <div className={"h-2/3 p-2 " + style.bgColor}>
                                <FontAwesomeIcon icon={style.icon} className="w-full h-full text-white" />
                            </div>
                            <div className={"flex items-center justify-center bg-white text-sm font-bold h-1/3 " + style.textColor}>
                                {character.team}
                            </div>
                        </div>
                        <div className="grow text-white">
                            <strong className="md:text-4xl text-2xl">{character.name}</strong><br/>
                            {character.isArrested ? <div className="bg-white text-tyrian-purple tracking-wide inline-block p-1 text-sm font-bold shadow-lg rounded-full flex items-center"><FontAwesomeIcon icon={faHandcuffs} className="mr-2 rounded-full p-2 bg-tyrian-purple text-white aspect-square" /> Arrested</div> :
                                <strong><PrismicText field={character.subtitle} /></strong>
                            }
                        </div>
                    </div>
                </div>
                <div className="p-5 flex-1">

                    <Tab.Group>
                        <Tab.List className="flex md:text-lg text-sm transition-all space-x-1 bg-gray-200 rounded-lg max-w-md p-1 mx-auto -mt-12 mb-6 justify-between shadow-lg">
                            <Tab className={({ selected }) =>
                                selected ? "w-full p-4 rounded-l-lg bg-white" : "w-full p-4 rounded-l-lg bg-white/20"}>
                                Biography
                            </Tab>
                            {character.team.toLowerCase() === "imposter" &&
                                <Tab className={({ selected }) =>
                                    selected ? "w-full p-4 bg-white" : "w-full p-4 rounded-l-lg bg-white/20"}>
                                    The Heist
                                </Tab>
                            }
                            <Tab className={({ selected }) =>
                                selected ? "w-full p-4 rounded-r-lg bg-white" : "w-full p-4 rounded-r-lg bg-white/20"}>
                                How to Play
                            </Tab>
                        </Tab.List>
                        <Tab.Panels>
                            <Tab.Panel className="space-y-5">
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
                            </Tab.Panel>
                            {character.team.toLowerCase() === "imposter" &&
                                <Tab.Panel className="space-y-5">
                                    <div>
                                        <h4>Heist Items</h4>
                                        <div className="p-5 rounded-lg bg-gray-200">
                                            <ol>
                                                <li>Statue of a Great Artist</li>
                                                <li>The Red Samurai</li>
                                                <li>Painting of the Purple People Eater</li>
                                                <li>The Shiny Bat</li>
                                                <li>The White Skull</li>
                                                <li>White USB Drive</li>
                                            </ol>
                                        </div>
                                    </div>
                                </Tab.Panel>
                            }
                            <Tab.Panel className="space-y-5">
                                <div>
                                    <h4>Arresting Players</h4>
                                    <div className="p-5 rounded-lg bg-gray-200">
                                        <h5>To start a <em>Trial</em>:</h5>
                                        <ol>
                                            <li>Gather <em>Active Players</em> into the living room.</li>
                                            <li>Make your case as to why the <em>Accused</em> player should be arrested.</li>
                                            <li>Allow the group to discuss the accusation.</li>
                                            <li>If the majority of <em>Active Players</em> vote to arrest the <em>Accused</em>, that player will be removed from the game.</li>
                                            <li><em>Host</em> will announce if any <em>Imposters</em> remain.</li>
                                        </ol>

                                        <h5>If the <em>Accused is arrested</em>:</h5>
                                        <ul>
                                            <li>The arrested player should <strong>always play innocent</strong>.</li>
                                            <li>The player will be marked as <q>arrested</q> and can no longer help with the investigation or the heist</li>
                                        </ul>
                                    </div>
                                </div>
                                <div>
                                    <h4>Detectives</h4>
                                    <div className="p-5 rounded-lg bg-gray-200">
                                        <h5>How <em>Detectives</em> win:</h5>
                                        <p>
                                            Solve the murder by correctly discovering <strong>who the murder is and how the victim was killed</strong>.
                                        </p>
                                        <p>
                                            When a <em>Detective</em> thinks they solved the case, gather everyone into the living room by exclaiming <q>I cracked the case!</q> The detective will then be given the floor to make their case and the host will then confirm if they are correct.
                                        </p>

                                        <h5>What happens if <em>Detectives</em> arrest all <em>Imposters</em>:</h5>
                                        <p>
                                            If the <em>Detectives</em> stop the heist by arresting all <em>Imposters</em> before the main case is solved, a bonus clue will be given to the team that could crack the case wide open.
                                        </p>

                                        <h5>How <em>Detectives</em> lose:</h5>
                                        <ul>
                                            <li>The <em>Imposters</em> complete their heist before the case is solved.</li>
                                            <li>Too many <em>Detectives</em> are falsely arrested (i.e.: There are an equal amount of <em>Detectives</em> and <em>Imposters</em> remaining)</li>
                                        </ul>
                                    </div>
                                </div>
                                <div>
                                    <h4>Imposters</h4>
                                    <div className="p-5 rounded-lg bg-gray-200">
                                        <h5>How <em>Imposters</em> win:</h5>
                                        <ol>
                                            <li>Either as an individual or as a group, <strong>collect all heist items</strong> (see below).</li>
                                            <li>Outsmart the <em>Detectives</em> by causing them to arrest too many members of their own team (i.e.: There are an equal amount of <em>Detectives</em> and <em>Imposters</em> remaining).</li>
                                        </ol>

                                        <h5>How the heist works:</h5>
                                        <p>
                                            Until the heist is complete, <em>Imposters</em> should blend in with the <em>Detectives</em> to avoid suspicions and can also cast suspicions on innocent player to remove them from the game.
                                        </p>
                                        <p>
                                            Once <em>Imposters</em> have obtained all items, exclaim <q>we have committed the perfect crime!</q> to gather everyone in the living room.
                                        </p>
                                        <p>
                                            Please note: <strong>You must have all the correct physical heist items with you</strong> ready to present to the host at time of exclamation in order to win. Members of the <em>Imposter</em> team may choose to send a photo message to the <em>Host</em> to confirm a heist item in secret.
                                        </p>

                                        <h5>How <em>Imposters</em> lose:</h5>
                                        <ul>
                                            <li>The <em>Detectives</em> solve the murder before the heist is complete.</li>
                                            <li>All <em>Imposters</em> are arrested.</li>
                                            <li>Falsely claiming the heist is complete without having all the correct items.</li>
                                        </ul>
                                    </div>
                                </div>
                            </Tab.Panel>
                        </Tab.Panels>
                    </Tab.Group>
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
        },
        revalidate: 10,
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