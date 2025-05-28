import { useState } from "react"
import ChartGraph from "./components/chartGraph" 
import CountdownTimer from "./components/countDownTimer"
import LoadingAnimation from "./components/loadingAnimation"
import CustomButton from "./components/shared/customButton"
import useGetEventData from "./hooks/useGetEventData"
import { BackWhiteIcon, ShareIcon2, LocationIcon, CalendarIcon2, ClockIcon, TicketIcon } from "./svg"
import { dateFormat, timeFormat } from "./utils/dateFormat"
import { formatNumberWithK } from "./utils/formatNumberWithK"
import { formatNumber } from "./utils/numberFormat"
import { textLimit } from "./utils/textlimit" 
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom"
import { RouterProvider } from "react-router-dom"
import SharePage from "./page/share"

function App() {

  const router = createBrowserRouter(

    createRoutesFromElements(
      <Route path="/">
        <Route index element={<SharePage />} />
        <Route path="share/:id" element={<SharePage />} /> 
      </Route>
    )
  );
  return (
    <div className=" w-full "  style={{ fontFamily: "Axiforma-Medium" }} >
      <RouterProvider router={router} />
    </div>
  )
}

export default App
