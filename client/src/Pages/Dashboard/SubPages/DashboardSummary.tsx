import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { dashboardSummaryProps } from "../../../Types/types";
const DashboardSummary = (props: dashboardSummaryProps) => {
  return (
    <Container>
      <Row>
        <Col>{props.available_properties}</Col>
        <Col>{props.pending_tasks}</Col>
        <Col>{props.pending_inquiries}</Col>
      </Row>
    </Container>
  );
};

export default DashboardSummary;
