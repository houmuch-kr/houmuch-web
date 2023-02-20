import React, { useState } from "react";
import styled from "styled-components";
import { Color } from "../../constants";
import { Simulate } from "react-dom/test-utils";
import load = Simulate.load;
import { Loader } from "~/components";

const Styles = {
  Style: styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  `,
  TableStyle: styled.table`
    width: 100%;
    margin: .5rem 0;
  `,
  TableHeaderRowStyle: styled.tr`
    font-weight: bold;
  `,
  TableHeaderColumnStyle: styled.th<{
    width?: string
  }>`
    font-weight: bold;
    font-size: 14px;
    padding: .5rem;
    width: ${({ width }) => width ? width : `auto`};
    border-bottom: 1px solid #ececec;
  `,
  TableRowStyle: styled.tr`
    font-size: 14px;
  `,
  TableColumnStyle: styled.td<{
    textAlign?: string
  }>`
    padding: .5rem;
    text-align: ${({ textAlign }) => textAlign ? textAlign : `center`};
  `,
  ButtonStyle: styled.button`
    background-color: ${({ color }) => color};
    outline: none;
    border: 0;
    padding: .25rem .75rem;
    border-radius: 5px;
    color: white;
    display: flex;
    align-items: center;
  `
}

interface Props {
  headers: Array<string>
  data: Array<{ [key: string]: any }>
  onQuery?: ({ page }: { page: number }) => void
  loading: boolean
}

const DataTable = ({ headers, data, loading, onQuery }: Props) => {
  const [ page, setPage ] = useState<number>(0)

  const handleClickMoreButton = () => {
    setPage(page => {
      const nextPage = page + 1
      if (onQuery) {
        onQuery({
          page: nextPage
        })
      }
      return nextPage
    })
  }

  return (
    <Styles.Style>
      <Styles.TableStyle>
        <thead>
        {
          <Styles.TableHeaderRowStyle>
            {
              headers.map((item, key) => {
                return (
                  <Styles.TableHeaderColumnStyle key={key}>{ item }</Styles.TableHeaderColumnStyle>
                )
              })
            }
          </Styles.TableHeaderRowStyle>
        }
        </thead>
        <tbody>
        {
          loading ? (
            <tr>
              <td colSpan={headers.length}>
                <Loader />
              </td>
            </tr>
          ) : data && data.map((row, rowKey) => {
            return (
              <Styles.TableRowStyle key={rowKey}>
                {
                  Object.entries(row).map(([key, value], columnKey) => {
                    return (
                      <Styles.TableColumnStyle key={columnKey}>{ value }</Styles.TableColumnStyle>
                    )
                  })
                }
              </Styles.TableRowStyle>
            )
          })
        }
        </tbody>
      </Styles.TableStyle>
      <Styles.ButtonStyle onClick={handleClickMoreButton} color={Color.DEFAULT}>더보기</Styles.ButtonStyle>
    </Styles.Style>
  )
}

export default DataTable
