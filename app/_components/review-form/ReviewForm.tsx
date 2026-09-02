"use client";

import { useState } from "react";
import {
  Button,
  Group,
  Stack,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { add_place } from "../../_client/flask-client";
import { INSET_PAGE_HEIGHT } from "../../app-context";
import type { Place } from "../../_model/place";

type ReviewFormValues = {
  name: string;
  display_name: string;
  coordinates: string;
  city: string;
  country: string;
  rating: string;
  types: string;
  tagline: string;
  review: string;
};

function placeToFormValues(place?: Partial<Place>): ReviewFormValues {
  return {
    name: place?.name ?? "",
    display_name: place?.display_name ?? "",
    coordinates: place?.coordinates?.join(", ") ?? "",
    city: place?.city ?? "",
    country: place?.country ?? "",
    rating: place?.rating != null ? String(place.rating) : "",
    types: place?.types?.join(", ") ?? "",
    tagline: place?.tagline ?? "",
    review: place?.review ?? "",
  };
}

function splitList(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export default function ReviewForm({
  initialPlace,
}: {
  initialPlace?: Partial<Place>;
}) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const form = useForm<ReviewFormValues>({
    initialValues: placeToFormValues(initialPlace),
  });

  async function handleSubmit(values: ReviewFormValues) {
    const place_data: Record<string, unknown> = {};
    if (values.name) place_data.name = values.name;
    if (values.display_name) place_data.display_name = values.display_name;
    if (values.city) place_data.city = values.city;
    if (values.country) place_data.country = values.country;
    if (values.tagline) place_data.tagline = values.tagline;
    if (values.rating) place_data.rating = values.rating;
    if (values.types) place_data.types = splitList(values.types);
    if (values.coordinates) place_data.coordinates = splitList(values.coordinates);

    const place_review: Record<string, unknown> = {};
    if (values.name) place_review.name = values.name;
    if (values.review) place_review.review = values.review;

    const ok = await add_place(place_data, place_review);
    if (ok) {
      setStatus("success");
      form.reset();
    } else {
      setStatus("error");
    }
  }

  return (
    <form
      onSubmit={form.onSubmit(handleSubmit)}
      style={{
        height: INSET_PAGE_HEIGHT,
        overflowY: "auto",
      }}
    >
      <Stack maw={500} mx="auto" p="md">
        <TextInput label="Name" {...form.getInputProps("name")} />
        <TextInput
          label="Display Name"
          description="Optional — falls back to a title-cased version of Name"
          {...form.getInputProps("display_name")}
        />
        <TextInput
          label="Coordinates"
          description="Comma-separated lat, lng pairs"
          {...form.getInputProps("coordinates")}
        />
        <TextInput label="City" {...form.getInputProps("city")} />
        <TextInput label="Country" {...form.getInputProps("country")} />
        <TextInput label="Rating" {...form.getInputProps("rating")} />
        <TextInput
          label="Types"
          description="Comma-separated"
          {...form.getInputProps("types")}
        />
        <TextInput label="Tagline" {...form.getInputProps("tagline")} />
        <Textarea
          label="Review"
          rows={10}
          styles={{ input: { resize: "vertical" } }}
          {...form.getInputProps("review")}
        />

        {status === "success" && <Text c="green">Review post succeeded</Text>}
        {status === "error" && <Text c="red">Review post failed</Text>}

        <Group justify="flex-end">
          <Button type="submit">Submit Review</Button>
        </Group>
      </Stack>
    </form>
  );
}
