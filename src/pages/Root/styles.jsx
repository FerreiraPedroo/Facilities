import styled from "styled-components";

export const Container = styled.div`
	display: flex;
	height: 100vh;
	overflow: hidden;
	flex-direction: row;
	gap: 8px;
`;

/* HR SEPARATOR */
export const HrLine = styled.hr`
	margin: 0px 8px;
	border: 1px solid #c0c0c0;
`;

export const CenterContainer = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: column;
	overflow: hidden;
	gap: 16px;
`;

export const Message = styled.div`
	padding: 20px;
`;
