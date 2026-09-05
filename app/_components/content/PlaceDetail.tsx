import { Badge, ScrollArea } from "@mantine/core";
import { getDisplayName, getTypeColor, type Place } from "../../_model/place";
import classes from "./PlaceDetail.module.css";

export default function PlaceDetail({
  place,
  offsetScrollbars = "x",
}: {
  place: Place;
  offsetScrollbars?: boolean | "x" | "y" | "present";
}) {
  return (
    <ScrollArea
      type="scroll"
      scrollbarSize={2}
      offsetScrollbars={offsetScrollbars}
      style={{ height: "100%" }}
    >
      <h1>{getDisplayName(place)}</h1>
      {place.tagline && <p>{place.tagline}</p>}
      {place.rating != null && <p>Rating: {place.rating}</p>}
      {(place.city || place.country) && (
        <p>{[place.city, place.country].filter(Boolean).join(", ")}</p>
      )}
      {place.types && (
        <p>
          {place.types.map((type) => (
            <Badge key={type} variant="light" color={getTypeColor(type)} mr={4}>
              {type}
            </Badge>
          ))}
        </p>
      )}
      {place.review && (
        <div key={place.name} className={classes.reviewWrapper}>
          <p style={{ whiteSpace: "pre-wrap" }}>{place.review}</p>
          <div className={classes.reviewOverlay} />
        </div>
      )}
    </ScrollArea>
  );
}
