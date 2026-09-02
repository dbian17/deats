"use client";

import { useState } from "react";
import { CloseButton, TextInput, type TextInputProps } from "@mantine/core";
import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import type { Place } from "../../_model/place";

type SearchBarProps = Omit<
  TextInputProps,
  | "onChange"
  | "placeholder"
  | "leftSection"
  | "rightSection"
  | "value"
  | "ref"
> & {
  places: Place[];
  onSearch: (filteredPlaces: Place[]) => void;
};

function placeSearchText(place: Place) {
  return (
    (place.types ?? []).join(",") +
    place.name +
    String(place.rating ?? 0) +
    (place.city ?? "") +
    (place.country ?? "")
  ).toLowerCase();
}

export default function SearchBar({
  places,
  onSearch,
  ...props
}: SearchBarProps) {
  const [value, setValue] = useState("");

  function handleChange(newValue: string) {
    setValue(newValue);
    const query = newValue.toLowerCase();
    onSearch(
      query
        ? places.filter((place) => placeSearchText(place).includes(query))
        : places,
    );
  }

  return (
    <TextInput
      placeholder="Search..."
      leftSection={<MagnifyingGlassIcon size={16} />}
      rightSection={
        value ? (
          <CloseButton size="sm" onClick={() => handleChange("")} />
        ) : null
      }
      radius="xl"
      value={value}
      onChange={(event) => handleChange(event.currentTarget.value)}
      {...props}
    />
  );
}
