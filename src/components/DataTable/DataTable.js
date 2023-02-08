import React, { useState } from "react";
import styled from "styled-components";
import { Color } from "../../constants";

const Style = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

const TableStyle = styled.table`
  width: 100%;
  margin: .5rem 0;
`

const TableHeaderRowStyle = styled.tr`
  font-weight: bold;
`

const TableHeaderColumnStyle = styled.th`
  font-weight: bold;
  font-size: 14px;
  padding: .5rem;
  width: ${({width}) => width ? width : `auto`};
  border-bottom: 1px solid #ececec;
`

const TableRowStyle = styled.tr`
  font-size: 14px;
`

const TableColumnStyle = styled.td`
  padding: .5rem;
  text-align: ${({ textAlign }) => textAlign ? textAlign : `center`};
`

const ButtonStyle = styled.button`
  background-color: ${({ color }) => color};
  outline: none;
  border: 0;
  padding: .25rem .75rem;
  border-radius: 5px;
  color: white;
  display: flex;
  align-items: center;
`

const DataTable = ({ headers, data, onQuery }) => {
  const [ page, setPage ] = useState(0)

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
    <Style>
      <TableStyle>
        <thead>
        {
          <TableHeaderRowStyle>
            {
              headers.map((item, key) => {
                return (
                  <TableHeaderColumnStyle key={key}>{ item }</TableHeaderColumnStyle>
                )
              })
            }
          </TableHeaderRowStyle>
        }
        </thead>
        <tbody>
        {
          data && data.map((row, rowKey) => {
            return (
              <TableRowStyle key={rowKey}>
              {
                Object.entries(row).map(([key, value], columnKey) => {
                  return (
                    <TableColumnStyle key={columnKey}>{ value }</TableColumnStyle>
                  )
                })
              }
              </TableRowStyle>
            )
          })
        }
        </tbody>
      </TableStyle>
      <ButtonStyle onClick={handleClickMoreButton} color={Color.DEFAULT}>더보기</ButtonStyle>
    </Style>
  )
}

export default DataTable
