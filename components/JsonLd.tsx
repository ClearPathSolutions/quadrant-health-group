/**
 * Renders one JSON-LD block (F-06 / V0092's sibling gap).
 *
 * The site it replaces runs Yoast, which emits structured data on every page,
 * so shipping without this is a measurable downgrade in machine-readable signal
 * at cutover — not a nice-to-have.
 *
 * `<` is escaped rather than the whole payload: a literal `</script>` inside a
 * string value would otherwise close the tag early. JSON.stringify does not do
 * this for us.
 */
export default function JsonLd({ data }: { data: object | object[] }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
