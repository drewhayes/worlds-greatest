import {createClient} from "../../prismicio";
import {SliceZone, PrismicText, PrismicRichText} from "@prismicio/react";

export default function Character({character}) {
    return (
        <div className="container mx-auto">
            <h1>Hello {character.name}</h1>
        </div>
    )
}

export async function getStaticProps({previewData, params}) {

    const client = createClient({ previewData })
    const character = await client.getByUID('character', params.uid)

    return {
        props: {
            character: character.data
        }
    }
}

export async function getStaticPaths() {

    const client = createClient();
    const documents = await client.getAllByType("character");

    return {
        paths: documents.map(character => {
            return {
                params: {
                    uid: character.uid
                }
            }
        }),
        fallback: false
    }
}