import Container from "@/components/Container";
import { get } from "@/utils/http";
import Map from "@/app/Map";

const HomePage = async ({ searchParams }: any) => {
  const { search } = searchParams;
  const response = await get<any>("/schools", { 'school.name': search }, { skipDeserialization: true })

  console.log("response => ", response)

  return (
    <Container>
      <Map results={response.results} search={search} />
    </Container>
  )
}

export default HomePage
