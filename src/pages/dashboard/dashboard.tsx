import { useState } from 'react';
import { Link } from 'react-router';

interface BoardSummary {
  id: string;
  name: string;
  color: string;
}

interface Workspace {
  id: string;
  name: string;
  members: { name: string; avatar: string }[];
  boards: BoardSummary[];
}

const COLORS = [
  'bg-blue-500',
  'bg-emerald-500',
  'bg-orange-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-cyan-600',
];

const workspaces: Workspace[] = [
  {
    id: 'product',
    name: 'Product Team',
    members: [
      { name: 'Bonnie Green', avatar: 'https://flowbite.com/application-ui/demo/images/users/bonnie-green.png' },
      { name: 'Roberta Casas', avatar: 'https://flowbite.com/application-ui/demo/images/users/roberta-casas.png' },
      { name: 'Michael Gough', avatar: 'https://flowbite.com/application-ui/demo/images/users/michael-gough.png' },
    ],
    boards: [
      { id: 'hvac-editor', name: 'HVAC Editor', color: COLORS[0] },
      { id: 'sprint-planning', name: 'Sprint Planning', color: COLORS[1] },
      { id: 'bug-tracker', name: 'Bug Tracker', color: COLORS[2] },
    ],
  },
  {
    id: 'marketing',
    name: 'Marketing',
    members: [
      { name: 'Bonnie Green', avatar: 'https://flowbite.com/application-ui/demo/images/users/bonnie-green.png' },
      { name: 'Roberta Casas', avatar: 'https://flowbite.com/application-ui/demo/images/users/roberta-casas.png' },
    ],
    boards: [
      { id: 'campaign-launch', name: 'Campaign Launch', color: COLORS[3] },
      { id: 'content-calendar', name: 'Content Calendar', color: COLORS[4] },
    ],
  },
  {
    id: 'personal',
    name: 'Personal',
    members: [
      { name: 'Bonnie Green', avatar: 'https://flowbite.com/application-ui/demo/images/users/bonnie-green.png' },
    ],
    boards: [
      { id: 'reading-list', name: 'Reading List', color: COLORS[5] },
    ],
  },
];

function WorkspaceIcon({ name }: { name: string }) {
  return (
    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-sm font-semibold text-white">
      {name.charAt(0).toUpperCase()}
    </div>
  );
}

function BoardCard({ board }: { board: BoardSummary }) {
  return (
    <Link
      to="/board"
      className="group relative block h-24 overflow-hidden rounded-lg shadow-sm transition-shadow hover:shadow-md"
    >
      <div className={`h-full w-full ${board.color} p-3`}>
        <span className="text-sm font-semibold text-white drop-shadow-sm">
          {board.name}
        </span>
      </div>
      <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
    </Link>
  );
}

function CreateBoardCard({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex h-24 w-full flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
    >
      + Create new board
    </button>
  );
}

function WorkspaceSection({ workspace }: { workspace: Workspace }) {
  return (
    <section className="mb-10">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <WorkspaceIcon name={workspace.name} />
          <h2 className="text-lg font-semibold text-gray-900">{workspace.name}</h2>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {workspace.members.map((member) => (
              <img
                key={member.name}
                src={member.avatar}
                alt={member.name}
                title={member.name}
                className="h-7 w-7 rounded-full border-2 border-white"
              />
            ))}
          </div>
          <button className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer">
            Boards
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {workspace.boards.map((board) => (
          <BoardCard key={board.id} board={board} />
        ))}
        <CreateBoardCard onClick={() => {}} />
      </div>
    </section>
  );
}

export default function Dashboard() {
  const [search, setSearch] = useState('');

  const filteredWorkspaces = workspaces
    .map((workspace) => ({
      ...workspace,
      boards: workspace.boards.filter((board) =>
        board.name.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter((workspace) => search === '' || workspace.boards.length > 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between px-6 py-3">
          <Link to="/">
            <h1 className="text-xl font-semibold text-gray-900">Trello Clone</h1>
          </Link>
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Search boards"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-56 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <img
              src="https://flowbite.com/application-ui/demo/images/users/bonnie-green.png"
              alt="You"
              className="h-8 w-8 rounded-full"
            />
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-6 py-8">
        <h2 className="mb-6 text-2xl font-bold text-gray-900">Your Workspaces</h2>
        {filteredWorkspaces.map((workspace) => (
          <WorkspaceSection key={workspace.id} workspace={workspace} />
        ))}
        {filteredWorkspaces.length === 0 && (
          <p className="text-sm text-gray-500">No boards match "{search}".</p>
        )}
      </div>
    </div>
  );
}
