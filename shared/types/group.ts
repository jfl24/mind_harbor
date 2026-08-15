export type GroupVisibility =
  | "PUBLIC"
  | "PRIVE";

export type MembershipStatus =
  | "EN_ATTENTE"
  | "ACCEPTEE"
  | "REFUSEE";

export type GroupMemberStatus =
  | "MODERATEUR"
  | "MEMBRE";

export type GroupUser = {
  id: string;
  pseudonyme?: string | null;
  prenom?: string | null;
  nom?: string | null;
  avatar?: string | null;
};

export interface Group {
  id: number;
  nom: string;
  description: string;
  thematique?: string | null;
  regles?: string | null;
  groupVisibility: GroupVisibility;
  moderateurId: string;
  createdAt: string;
  updatedAt: string;
}

export interface GroupWithModerator extends Group {
  moderateur: GroupUser;
  _count: {
    groupMemberships: number;
    posts: number;
  };
}

export interface CreateGroupRequest {
  nom: string;
  description: string;
  thematique?: string;
  regles?: string;
  groupVisibility?: GroupVisibility;
}

export interface GroupMembership {
  id: number;
  groupId: number;
  userId: string;
  groupMemberStatus: GroupMemberStatus;
  membershipStatus: MembershipStatus;
  joinedAt: string;
}

export interface GroupMembershipWithUser
  extends GroupMembership {
  user: GroupUser;
}

export interface ProcessMembershipRequest {
  decision: "ACCEPTEE" | "REFUSEE";
}