import SubjectList from "@/components/SubjectListCard";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col p-10">
			<h1 className="text-4xl font-bold text-center">SRM VIRTUAL LAB</h1>
			<SubjectList
				subjects={[
					{
						title: "DAA",
						desc: "Design and Analysis of Algorithms",
					},
					{
						title: "OODP",
						desc: "Object Oriented Design and Programming",
					},
					{
						title: "PPS",
						desc: "Principles of Programming Languages",
					},
				]}
			/>
		</main>
	);
}
