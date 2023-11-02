type Props = {
  params: { slug: string };
};

export default function ProductDetail({ params }: Props) {
  return <>{params.slug} ProductDetail</>;
}
