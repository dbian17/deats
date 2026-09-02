import { get_place_data } from "../../_client/flask-client";
import ReviewForm from "../../_components/review-form/ReviewForm";

export const dynamic = "force-dynamic";

export default async function EditReviewPage({
  params,
}: {
  params: Promise<{ place_name: string }>;
}) {
  const { place_name } = await params;
  const place = await get_place_data(place_name);

  return <ReviewForm initialPlace={place ?? { name: place_name }} />;
}
