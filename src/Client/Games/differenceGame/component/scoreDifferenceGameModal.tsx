import React from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { Button } from "react-bootstrap";
import SummaryScore from "../../../../models/summaryScore.model";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

interface SummaryProp {
  summaries: SummaryScore[];
}

function ScoreDifferenceGameModal({ summaries }: SummaryProp) {
  const countCorrect = (summaries: SummaryScore[]) => {
    return summaries.reduce((count: number, summary) => {
      if (summary.status === "ถูก") {
        count += 1;
      }
      return count;
    }, 0);
  };

  const handlePlayAgain = () => {
    window.location.reload();
  };

  const handleBackToSelectGame = () => {
    window.location.href = "/games";
  };

  return (
    <>
      <div className="flex flex-col w-full bg-white">
        <h1 className="text-gray-600 px-2 py-3">
          คะแนนที่ได้ : {countCorrect(summaries)}/3
        </h1>
        <div className="border-2 border-gray-200 rounded-xl p-2">
          <MDBTable>
            <MDBTableHead>
              <tr className="flex">
                <th className="w-[35%] flex justify-center border-r-2">
                  <h1 className="text-lg md:text-2xl lg:text-3xl font-bold text-gray-600">
                    รูปที่ต่างกัน
                  </h1>
                </th>
                <th className="w-[24%] flex justify-center border-r-2">
                  <h1 className="text-lg md:text-2xl lg:text-3xl font-bold text-gray-600">
                    เฉลย
                  </h1>
                </th>
                <th className="w-[24%] flex justify-center border-r-2">
                  <h1 className="text-lg md:text-2xl lg:text-3xl font-bold text-gray-600">
                    คำตอบของคุณ
                  </h1>
                </th>
                <th className="w-[17%] flex justify-center">
                  <h1 className="text-lg md:text-2xl lg:text-3xl font-bold text-gray-600">
                    สถานะ
                  </h1>
                </th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {summaries &&
                summaries.map((summary, index) => (
                  <tr key={index} className="flex">
                    <td className="w-[35%] flex items-center justify-center border-r-2">
                      <img
                        src={summary.img}
                        className="rounded-xl md:p-2 md:rounded-3xl"
                      />
                    </td>
                    <td className="w-[24%] flex items-center justify-center border-r-2">
                      <h1 className="text-lg md:text-2xl lg:text-3xl text-gray-600">
                        {summary.correctAns}
                      </h1>
                    </td>
                    <td className="w-[24%] flex items-center justify-center border-r-2">
                      <h1 className="text-lg md:text-2xl lg:text-3xl text-gray-600">
                        {summary.userAns}
                      </h1>
                    </td>
                    <td className="w-[17%] flex items-center justify-center">
                      {summary.status === "ถูก" ? (
                        <div className="p-2 border-3 border-green-700 rounded-full bg-green-500">
                          <CheckIcon className="text-white" />
                        </div>
                      ) : (
                        <div className="p-2 border-3 border-red-700 rounded-full bg-red-500">
                          <ClearIcon className="text-white" />
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
            </MDBTableBody>
          </MDBTable>
        </div>
        <div className="flex items-center justify-end py-4 space-x-4">
          <Button onClick={handleBackToSelectGame} className="btn-danger">
            กลับ
          </Button>
          <Button onClick={handlePlayAgain} className="btn-primary">
            เล่นอีกครั้ง
          </Button>
        </div>
      </div>
    </>
  );
}
export default ScoreDifferenceGameModal;
