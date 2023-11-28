import React from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { Button } from "react-bootstrap";
import SummaryScore from "../../../../models/summaryScore.model";

interface SummaryProp {
  summaries: SummaryScore[];
}

function ScoreQuizGameModal({ summaries }: SummaryProp) {
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
          คะแนนที่ได้ : {countCorrect(summaries)}/5
        </h1>
        <div className="border-2 border-gray-200 rounded-xl p-2">
          <MDBTable>
            <MDBTableHead>
              <tr className="flex">
                <th className="w-[35%] flex justify-center border-r-2">
                  โจทย์
                </th>
                <th className="w-[24%] flex justify-center border-r-2">เฉลย</th>
                <th className="w-[24%] flex justify-center border-r-2">
                  คำตอบของคุณ
                </th>
                <th className="w-[17%] flex justify-center">สถานะ</th>
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
                      {summary.correctAns}
                    </td>
                    <td className="w-[24%] flex items-center justify-center border-r-2">
                      {summary.userAns}
                    </td>
                    <td className="w-[17%] flex items-center justify-center">
                      {summary.status}
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

export default ScoreQuizGameModal;
