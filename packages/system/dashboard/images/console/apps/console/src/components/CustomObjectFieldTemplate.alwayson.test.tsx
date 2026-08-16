import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import { CustomObjectFieldTemplate } from "./CustomObjectFieldTemplate.tsx"

const prop = (name: string) => ({
  name,
  content: <div data-testid={`field-${name}`} />,
  disabled: false,
  readonly: false,
  hidden: false,
})

const base = {
  idSchema: { $id: "root_addons_cilium" },
  schema: {},
  title: "cilium",
  description: "Cilium CNI plugin.",
  formData: {},
} as never

describe("mandatory addons render as always on", () => {
  it("says so when the object carries only valuesOverride", () => {
    render(
      <CustomObjectFieldTemplate {...(base as object)} properties={[prop("valuesOverride")]} />,
    )
    expect(screen.getByText(/Always on/)).toBeTruthy()
    expect(screen.queryByRole("checkbox")).toBeNull()
  })

  it("leaves a toggleable addon alone", () => {
    render(
      <CustomObjectFieldTemplate
        {...(base as object)}
        properties={[prop("enabled"), prop("valuesOverride")]}
      />,
    )
    expect(screen.queryByText(/Always on/)).toBeNull()
    expect(screen.getByTestId("field-enabled")).toBeTruthy()
  })
})
