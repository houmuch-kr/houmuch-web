import React from "react";
import styled from "styled-components";
import { Color } from "../../constants";
import { Loader } from "~/components";
import { useTableContext } from "~/hooks";
import { Simulate } from "react-dom/test-utils";
import load = Simulate.load;

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
    wrapColumn?: boolean
  }>`
    padding: .5rem;
    text-align: ${({ textAlign }) => textAlign ? textAlign : `center`};
    white-space: ${({ wrapColumn }) => wrapColumn ? `wrap` : `nowrap`};
    border-bottom: 1px solid #ececec;
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
  wrapColumn?: Array<number>
  onQuery?: ({ page }: { page: number }) => void
  loading: boolean
}

const DataTable = ({ headers, data, wrapColumn, loading, onQuery }: Props) => {
  const { setPage } = useTableContext()

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
          data && data.map((row, rowKey) => {
            return (
              <Styles.TableRowStyle key={rowKey}>
                {
                  Object.entries(row).map(([key, value], columnKey) => {
                    return (
                      <Styles.TableColumnStyle wrapColumn={wrapColumn?.includes(columnKey)} key={columnKey}>{ value }</Styles.TableColumnStyle>
                    )
                  })
                }
              </Styles.TableRowStyle>
            )
          })
        }
        {
          loading && (
            <tr>
              <td colSpan={headers.length}>
                <Loader />
              </td>
            </tr>
          )
        }
        </tbody>
      </Styles.TableStyle>
      <Styles.ButtonStyle onClick={handleClickMoreButton} color={Color.DEFAULT}>더보기</Styles.ButtonStyle>
    </Styles.Style>
  )
}

export default DataTable
