const templates: {
  [key: number]: {
    id: number;
    name: string;
    lastEdited: string;
  };
} = {
  1: {
    id: 1,
    name: "Performance Review",
    lastEdited: "2 days ago",
  },

  2: {
    id: 2,
    name: "Quarterly Assessment",
    lastEdited: "1 week ago",
  },
  3: {
    id: 3,
    name: "Employee Evaluation",
    lastEdited: "3 weeks ago",
  },
  4: {
    id: 4,
    name: "Team Metrics",
    lastEdited: "1 month ago",
  },
};

export default templates as {
  [key: number]: {
    id: number;
    name: string;
    lastEdited: string;
    description?: string;
    createdAt?: string;
    countOfEdits?: number;
    createdBy?: string;
  };
};
