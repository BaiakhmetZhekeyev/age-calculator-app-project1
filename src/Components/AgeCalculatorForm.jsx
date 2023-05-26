import React from "react";
import { ArrowDownOutlined } from "@ant-design/icons";
import { Divider, Button, Form, Input } from "antd";
import "../Style/ageCalculatorForm.css";
import FormItemLabel from "./FormItemLabel";

function AgeCalculatorForm() {
  const [calcDay, setCalcDay] = React.useState("- -");
  const [calcMonth, setCalcMonth] = React.useState("- -");
  const [calcYear, setCalcYear] = React.useState("- -");

  const onFinish = (values) => {
    console.log("Success:", values);
    console.log(values.day);
    console.log(values.month);
    console.log(values.year);
    const birthday = new Date(values.year, values.month - 1, values.day);
    const age = new Date(Date.now() - birthday.getTime());
    setCalcYear(age.getFullYear() - 1970);
    setCalcMonth(age.getMonth());
    setCalcDay(age.getDate() - 1);
  };

  return (
    <div className={"calculatorWrapper"}>
      <div className={"calculator"}>
        <Form
          requiredMark={false}
          layout={"vertical"}
          onFinish={onFinish}
          name={"basic"}
          size={"large"}
        >
          <div style={{ display: "flex", gap: 30 }}>
            <Form.Item
              name={"day"}
              className={"inputItem"}
              label={<FormItemLabel label={"DAY"} />}
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (
                      getFieldValue("day") &&
                      getFieldValue("month") &&
                      getFieldValue("year")
                    ) {
                      if (
                        new Date() -
                          new Date(
                            getFieldValue("year"),
                            getFieldValue("month") - 1,
                            getFieldValue("day")
                          ) <=
                        0
                      ) {
                        return Promise.reject(new Error("Must be in the past"));
                      }
                    }

                    // const validMonth = getFieldValue("month") === 12 ?
                    const maxDay =
                      getFieldValue("year") && getFieldValue("month")
                        ? new Date(
                            getFieldValue("year"),
                            getFieldValue("month"),
                            -1
                          ).getDate() + 1
                        : 31;
                    console.log(maxDay);
                    if (value >= 1 && value <= maxDay) {
                      return Promise.resolve();
                    }

                    return Promise.reject(new Error("Must be a valid day"));
                  },
                }),
              ]}
            >
              <Input placeholder={"DD"} />
            </Form.Item>
            <Form.Item
              name={"month"}
              className={"inputItem"}
              label={<FormItemLabel label={"MONTH"} />}
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (
                      getFieldValue("day") &&
                      getFieldValue("month") &&
                      getFieldValue("year")
                    ) {
                      if (
                        new Date() -
                          new Date(
                            getFieldValue("year"),
                            getFieldValue("month") - 1,
                            getFieldValue("day")
                          ) <=
                        0
                      ) {
                        return Promise.reject(new Error("Must be in the past"));
                      }
                    }
                    if (value >= 1 && value <= 12) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Must be a valid month"));
                  },
                }),
              ]}
            >
              <Input placeholder={"MM"} />
            </Form.Item>
            <Form.Item
              name={"year"}
              className={"inputItem"}
              label={<FormItemLabel label={"YEAR"} />}
              // label={"YEAR"}
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (
                      getFieldValue("day") &&
                      getFieldValue("month") &&
                      getFieldValue("year")
                    ) {
                      if (
                        new Date() -
                          new Date(
                            getFieldValue("year"),
                            getFieldValue("month") - 1,
                            getFieldValue("day")
                          ) <=
                        0
                      ) {
                        return Promise.reject(new Error("Must be in the past"));
                      }
                    }
                    if (value >= 1970 && value <= 2024) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Must be a valid year"));
                  },
                }),
              ]}
            >
              <Input placeholder={"YYYY"} />
            </Form.Item>
          </div>
          <Divider orientation={"right"}>
            <Form.Item>
              <Button
                className={"buttonCalc"}
                shape={"circle"}
                icon={<ArrowDownOutlined />}
                type={"ghost"}
                htmlType={"submit"}
              />
            </Form.Item>
          </Divider>
        </Form>

        <div>
          <div className={"flex"}>
            <h1>{calcYear}</h1> <h2>year</h2>
          </div>
          <div className={"flex"}>
            <h1>{calcMonth}</h1> <h2>month</h2>
          </div>
          <div className={"flex"}>
            <h1>{calcDay}</h1> <h2>day</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export { AgeCalculatorForm };
