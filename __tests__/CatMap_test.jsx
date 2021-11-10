import React from "react"
import { render, waitFor } from "@testing-library/react-native"
import CatMap from "../components/CatMap"

describe("<UserScreen />", () => {
  test("should renders MapView and Marker with user current location", () => {
    render(<CatMap />)
  })
})