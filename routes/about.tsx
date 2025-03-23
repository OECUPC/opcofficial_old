import ExternalLink from "../components/ExternalLink.tsx";

interface Activist {
	year: number;
	members: number;
}

interface Member {
	name: string;
	entered: number;
	faculty: string;
	clubs: string[];
	sns: { type: string; id: string }[];
}

// 現在年度から学年を計算
const CalclateGrade = (entered: number) => {
	const date = new Date();

	// 4月(month: 3)を超えているなら学年を足す
	return date.getFullYear() - entered +
		(date.getMonth() < 3 ? 0 : 1);
};

const MemberNode = (member: Member) => {
	return (
		<section class="members-container">
			<h4>{member.name}</h4>
			<section>
				<p>ニックネーム: {member.name}</p>
				<p>学部学科　　: {member.faculty}</p>
				<p>学年　　　　: {CalclateGrade(member.entered)}回生</p>
				<p>所属クラブ</p>
				<ul>
					{member.clubs.map((club) => <li>{club}</li>)}
				</ul>
				{(0 < member.sns.length) ? <p>SNS</p> : <></>}
				<ul>
					{member.sns.map((elem) => {
						if (elem.type === "twitter" || elem.type === "x") {
							return (
								<li>
									<ExternalLink
										href={`https://x.com/${elem.id}`}
										name={elem.id}
									/>
								</li>
							);
						}
					})}
				</ul>
			</section>
		</section>
	);
};

export default function Home() {
	const activists = JSON.parse(
		Deno.readTextFileSync("./static/data/activists.json"),
	);

	const members = JSON.parse(
		Deno.readTextFileSync("./static/data/members.json"),
	);

	const Contents = [
		{
			"title": "目的",
			"image": "/images/intro/icon.png",
			"imageAlt": "オフィシャルアイコン",
			"content": (
				<div>
					<p>
						主に、プログラミングをゆるく楽しむサークルです！
					</p>
					<ul>
						<li>プログラミングはわからないけど、興味がある</li>
						<li>programmingの授業でわからないところがある</li>
						<li>自分で何か作品を作りたい！</li>
						<li>競技プログラミングに挑戦してみたい！</li>
					</ul>
					<p>など、初心者から上級者のかたまで、大大大歓迎です！</p>
				</div>
			),
		},
		{
			"title": "活動内容",
			"image": "/images/intro/activitie.jpg",
			"imageAlt": "活動風景",
			"content": (
				<div>
					<ul>
						<li>プログラミングを楽しむ！</li>
						<li>競技プログラミング(AtCoder等)</li>
						<li>アプリ開発(Web/ネイティブ)</li>
						<li>プログラミングの問題を解く</li>
						<li>プログラミングの講座</li>
						<li>情報系資格の勉強会</li>
					</ul>
					<p>
						などなど...<br />
						このサイトも部員がDenoとFreshで制作しています！
					</p>
				</div>
			),
		},
		{
			"title": "活動場所",
			"image": "/images/intro/place.jpg",
			"imageAlt": "本学6号館の画像",
			"content": (
				<div>
					<ul>
						<li>大阪電気通信大学 四条畷キャンパス(空き教室など)</li>
						<li>大阪電気通信大学 寝屋川キャンパス(空き教室など)</li>
						<li>オンライン(Discord等)</li>
					</ul>
					<p>
						サークルの部室はないので、<br />
						空き教室やオンラインなどで活動しています！<br />
						活動は自由参加ですので気軽に参加してください！
					</p>
				</div>
			),
		},
		{
			"title": "活動人数",
			"image": "/images/no_image.png",
			"imageAlt": "ダミー",
			"content": (
				<div>
					<ul>
						{activists["members_of_each_entered"]?.sort(
							(a: Activist, b: Activist) => {
								return b.year - a.year;
							},
						)?.map((elem: Activist) => {
							if (elem.year === null) return;
							return <li>{`${elem.year}年度入学生: ${elem.members}`}</li>;
						})}
					</ul>
					<p>
						{`計${activists["total_members"]}名(${activists["latest_update"]
							}時点)`}
					</p>
				</div>
			),
		},
		{
			"title": "相談・入部等",
			"image": "/images/intro/profile.png",
			"imageAlt": "ダミー",
			"content": (
				<div>
					<p>
						<ExternalLink
							href="https://x.com/oecuprogramming"
							name="公式X(旧Twitter)"
						/>のDM、<br />
						または、<a href="/contact">Contact</a>までご連絡ください！
					</p>
				</div>
			),
		},
	];

	return (
		<main>
			{/* Content wrapper */}
			<article>
				<h1 className="center-align">サークルについて</h1>
				<article>
					{Contents.map((content) => (
						<section className="media-container">
							<section className="media-container__content">
								<h2>{content.title}</h2>
								{content.content}
							</section>
							<figure className="media-container__image">
								<img src={content.image} alt={content.imageAlt} />
							</figure>
						</section>
					))}
				</article>
				{/*
				<article className="member-introduce">
					<h2>部員紹介</h2>
					<section>
						<h3>代表</h3>
						{members.leaders.map((leader: Member) => MemberNode(leader))}
						<h3>副代表</h3>
						<section>
							{members.subleaders.map((subleader: Member) =>
								MemberNode(subleader)
							)}
						</section>
						<h3>会計</h3>
						<section>
							{members.accountants.map((accountant: Member) =>
								MemberNode(accountant)
							)}
						</section>
						<h3>主な部員</h3>
						<section>
							{members.members.map((member: Member) => MemberNode(member))}
						</section>
					</section>
				</article>
				*/}
			</article>
		</main>
	);
}
