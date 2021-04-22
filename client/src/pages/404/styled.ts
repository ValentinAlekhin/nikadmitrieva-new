import styled from 'styled-components'

export const Wrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export const ErrorNum = styled.h2`
  display: inline-block;
  border-right: 1px solid rgba(0, 0, 0, 0.3);
  margin-right: 20px;
  padding: 10px 23px 10px 0;
  font-size: 24px;
  font-weight: 500;
  vertical-align: top;
  color: #404044;
`

export const ErrorText = styled.p`
  display: inline-block;
  line-height: 55px;
  height: 49px;
  vertical-align: middle;
  font-size: 14px;
`
