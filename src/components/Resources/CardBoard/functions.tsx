export function totalCard(
  data: any,
  active?: number | null
) {
  if (active !== null) {
    return data.reduce(
      (acc: any, element: any) =>
        acc +
        (element.value && +element.status === active
          ? parseFloat(element.value)
          : 0),
      0
    );
  } else {
    return data.reduce(
      (acc: any, element: any) =>
        acc + (element.value ? parseFloat(element.value) : 0),
      0
    );
  }
}
