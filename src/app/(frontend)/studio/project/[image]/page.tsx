import ImageView from "@/components/studio/ImageView";


export default function Page({ params }: { params: { image: string } }) {

    return <ImageView imageId={params.image} />
}