import React from "react";
import { Button } from "react-bootstrap";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import Summary from "../schema/summary.schema";

interface ScoreSimulationGameProp {
  summary: Summary | undefined;
}

function ScoreSimulationGameModel({ summary }: ScoreSimulationGameProp) {
  const handleBackToSelectGame = () => {
    window.location.href = "/games";
  };

  const handlePlayAgain = () => {
    window.location.reload();
  };

  return (
    <>
      <div className="flex flex-col w-full bg-white">
        <div className="flex flex-col items-center space-y-10">
          <div className="flex flex-col items-center space-y-3">
            <video
              autoPlay
              controls
              muted
              loop
              className="w-[80%] h-auto"
              src={summary?.video}
            />
            <span className="text-gray-600 text-sm md:text-lg">
              คำอธิบาย: {summary?.description}
            </span>
          </div>
          <div className="w-[100%]">
            <MDBTable className="border-2">
              <MDBTableHead>
                <tr className="flex justify-between">
                  <th className="w-[40%] flex justify-center border-r-2 text-sm md:text-lg">
                    คำตอบของคุณ
                  </th>
                  <th className="w-[30%] flex justify-center border-r-2 text-sm md:text-lg">
                    เฉลย
                  </th>
                  <th className="w-[30%] flex justify-center text-sm md:text-lg">
                    สถานะ
                  </th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {summary && (
                  <>
                    <tr className="flex justify-between">
                      <td className="w-[40%] flex justify-center border-r-2 text-sm md:text-lg">
                        {summary.select_A}
                      </td>
                      <td className="w-[30%] flex justify-center border-r-2 text-sm md:text-lg">
                        {summary.answer_A}
                      </td>
                      <td className="w-[30%] flex justify-center text-sm md:text-lg">
                        {summary.status_A}
                      </td>
                    </tr>
                    <tr className="flex justify-between">
                      <td className="w-[40%] flex justify-center border-r-2 text-sm md:text-lg">
                        {summary.select_B}
                      </td>
                      <td className="w-[30%] flex justify-center border-r-2 text-sm md:text-lg">
                        {summary.answer_B}
                      </td>
                      <td className="w-[30%] flex justify-center text-sm md:text-lg">
                        {summary.status_B}
                      </td>
                    </tr>
                  </>
                )}
              </MDBTableBody>
            </MDBTable>
          </div>
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

export default ScoreSimulationGameModel;
