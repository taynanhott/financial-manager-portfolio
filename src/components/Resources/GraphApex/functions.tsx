export function seriesPayment(
  label: any,
  data: any,
  fluxo: "category" | "subcategory"
) {
  const labels = label.map((lab: any) => ({
    id: lab.id,
    description: lab.description,
  }));

  const sums: { [key: string]: { category: string; value: number }[] } = {};

  data.forEach((entry: any) => {
    const value = parseFloat(entry.value) || 0;
    const typeIndex =
      fluxo === "category"
        ? (entry.categoryId as string)
        : (entry.subcategoryId as string);
    const index = labels.findIndex((lab: any) => lab.id === typeIndex);

    if (!sums[typeIndex]) {
      sums[typeIndex] = [];
    }

    sums[typeIndex].push({
      category: labels[index].description,
      value: value,
    });
  });

  const series = Object.keys(sums).map((key) => {
    return {
      name: sums[key][0].category,
      data: [sums[key].reduce((acc, curr) => acc + curr.value, 0)],
    };
  });

  return series;
}