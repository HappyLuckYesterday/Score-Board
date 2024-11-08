// Code generated by goctl. DO NOT EDIT.
package types

type AddUserRequest struct {
	Name     string `json:"name"`
	NickName string `json:"nick_name"`
	Email    string `json:"email"`
	Password string `json:"password"`
	GroupId  uint64 `json:"group_id"`
}

type AddUserResponse struct {
}

type CreateGroupRequest struct {
	Name string `json:"name"`
}

type CreateGroupResponse struct {
	Id uint64 `json:"id"`
}

type CreateScoreRequest struct {
	UserId    uint64 `json:"user_id"`
	GroupId   uint64 `json:"group_id"`
	Score     int64  `json:"score"`
	SubjectId uint64 `json:"subject_id"`
}

type CreateScoreResponse struct {
	Id uint64 `json:"id"`
}

type CreateSubjectRequest struct {
	Name        string `json:"name"`
	Description string `json:"description"`
	DueDate     int64  `json:"due_date"`
	Score       int64  `json:"score"`
	Accept      string `json:"accept"`
}

type CreateSubjectResponse struct {
	Id uint64 `json:"id"`
}

type CreateSubscribeRequest struct {
	UserId    uint64 `json:"user_id"`
	SubjectId uint64 `json:"subject_id"`
}

type CreateSubscribeResponse struct {
	Id uint64 `json:"id"`
}

type DeleteGroupRequest struct {
	Id uint64 `json:"id"`
}

type DeleteGroupResponse struct {
}

type DeleteScoreRequest struct {
	Id uint64 `json:"id"`
}

type DeleteScoreResponse struct {
}

type DeleteSubjectRequest struct {
	Ids []int64 `json:"ids"`
}

type DeleteSubjectResponse struct {
}

type DeleteSubscribeRequest struct {
	Ids []int64 `json:"ids"`
}

type DeleteSubscribeResponse struct {
}

type DeleteUserRequest struct {
	Ids []uint64 `json:"ids"`
}

type DeleteUserResponse struct {
}

type Group struct {
	Id   uint64 `json:"id"`
	Name string `json:"name"`
}

type GroupDetailRequest struct {
	Id uint64 `path:"id"`
}

type GroupListFilter struct {
	Name string `json:"name,optional"`
}

type GroupListRequest struct {
	PageNum  int64            `json:"page_num"`
	PageSize int64            `json:"page_size"`
	Filters  *GroupListFilter `json:"filters,optional"`
}

type GroupListResponse struct {
	Total   int64    `json:"total"`
	PageNum int64    `json:"page_num"`
	List    []*Group `json:"list"`
}

type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type LoginResponse struct {
	AccessToken string `json:"accessToken"`
}

type RegisterRequest struct {
	Name     string `json:"name"`
	NickName string `json:"nick_name"`
	Email    string `json:"email"`
	Password string `json:"password"`
	GroupId  uint64 `json:"group_id"`
}

type RegisterResponse struct {
}

type Score struct {
	Id         uint64 `json:"id"`
	UserId     uint64 `json:"user_id"`
	GroupId    uint64 `json:"group_id"`
	Score      int64  `json:"score"`
	SubjectId  uint64 `json:"subject_id"`
	CreateId   uint64 `json:"create_id"`
	CreateTime int64  `json:"create_time"`
	UpdateId   uint64 `json:"update_id"`
	UpdateTime int64  `json:"update_time"`
}

type ScoreDetailRequest struct {
	Id uint64 `path:"id"`
}

type ScoreListFilter struct {
	UserId    uint64 `json:"user_id,optional"`
	GroupId   uint64 `json:"group_id,optional"`
	SubjectId uint64 `json:"subject_id,optional"`
}

type ScoreListRequest struct {
	PageNum  int64            `json:"page_num"`
	PageSize int64            `json:"page_size"`
	Filters  *ScoreListFilter `json:"filter,optional"`
}

type ScoreListResponse struct {
	Total   int64    `json:"total"`
	PageNum int64    `json:"page_num"`
	List    []*Score `json:"list"`
}

type Subject struct {
	Id          uint64 `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	DueDate     int64  `json:"due_date"`
	Score       int64  `json:"score"`
	Accept      string `json:"accept"`
	CreateId    uint64 `json:"create_id"`
	CreateTime  int64  `json:"create_time"`
}

type SubjectDetailRequest struct {
	Id uint64 `path:"id"`
}

type SubjectListFilter struct {
	Name   string `json:"name,optional"`
	Accept string `json:"accept,optional"`
}

type SubjectListRequest struct {
	PageNum  int64              `json:"pageNum"`
	PageSize int64              `json:"pageSize"`
	Filters  *SubjectListFilter `json:"filters,optional"`
}

type SubjectListResponse struct {
	Total   int64      `json:"total"`
	PageNum int64      `json:"pageNum"`
	List    []*Subject `json:"list"`
}

type Subscribe struct {
	Id         uint64 `json:"id"`
	UserId     uint64 `json:"user_id"`
	SubjectId  uint64 `json:"subject_id"`
	CreateId   uint64 `json:"create_id"`
	CreateTime int64  `json:"create_time"`
	UpdateId   uint64 `json:"update_id"`
	UpdateTime int64  `json:"update_time"`
}

type SubscribeDetailRequest struct {
	Id uint64 `path:"id"`
}

type SubscribeListFilter struct {
	SubjectId uint64 `json:"subject_id,optional"`
	UserId    uint64 `json:"user_id,optional"`
}

type SubscribeListRequest struct {
	PageNum  int64                `json:"page_num"`
	PageSize int64                `json:"page_size"`
	Filters  *SubscribeListFilter `json:"filters,optional"`
}

type SubscribeListResponse struct {
	Total   int64        `json:"total"`
	PageNum int64        `json:"page_num"`
	List    []*Subscribe `json:"list"`
}

type UpdateGroupRequest struct {
	Id   uint64 `json:"id"`
	Name string `json:"name"`
}

type UpdateGroupResponse struct {
	Id uint64 `json:"id"`
}

type UpdateScoreRequest struct {
	Id        uint64 `json:"id"`
	Score     int64  `json:"score"`
	UserId    uint64 `json:"user_id"`
	GroupId   uint64 `json:"group_id"`
	SubjectId uint64 `json:"subject_id"`
}

type UpdateScoreResponse struct {
}

type UpdateSubjectRequest struct {
	Id          uint64 `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	DueDate     int64  `json:"due_date"`
	Score       int64  `json:"score"`
	Accept      string `json:"accept"`
}

type UpdateSubjectResponse struct {
}

type UpdateSubscribeRequest struct {
	Id        uint64 `json:"id"`
	UserId    uint64 `json:"user_id"`
	SubjectId uint64 `json:"subject_id"`
}

type UpdateSubscribeResponse struct {
	Id uint64 `json:"id"`
}

type UpdateUserDetailRequest struct {
	Name     string `json:"name"`
	NickName string `json:"nick_name"`
	GroupId  uint64 `json:"group_id"`
}

type UpdateUserDetailResponse struct {
}

type UpdateUserPasswordRequest struct {
	OldPassword string `json:"oldPassword"`
	NewPassword string `json:"newPassword"`
}

type UpdateUserPasswordResponse struct {
}

type UpdateUserRequest struct {
	Id       uint64 `json:"id"`
	Name     string `json:"name"`
	NickName string `json:"nick_name"`
	Email    string `json:"email"`
	Password string `json:"password"`
	GroupId  uint64 `json:"group_id"`
}

type UpdateUserResponse struct {
}

type User struct {
	Id         uint64 `json:"id"`
	Name       string `json:"name"`
	NickName   string `json:"nick_name"`
	Email      string `json:"email"`
	Type       string `json:"type"`
	Password   string `json:"password"`
	GroupId    uint64 `json:"group_id"`
	ActiveFlag string `json:"active_flag"`
	CreateTime int64  `json:"create_time"`
}

type UserDetailRequest struct {
	Id uint64 `path:"id"`
}

type UserDetailResponse struct {
	Id       uint64 `json:"id"`
	Name     string `json:"name"`
	NickName string `json:"nick_name"`
	Password string `json:"password"`
	GroupId  uint64 `json:"group_id"`
}

type UserListFilter struct {
	Name     string `json:"name,optional"`
	NickName string `json:"nick_name,optional"`
	Email    string `json:"email,optional"`
	Type     string `json:"type,optional"`
	GroupId  uint64 `json:"group_id,optional"`
}

type UserListRequest struct {
	PageNum  int64           `json:"pageNum"`
	PageSize int64           `json:"pageSize"`
	Filters  *UserListFilter `json:"filters,optional"`
}

type UserListResponse struct {
	Total   int64   `json:"total"`
	PageNum int64   `json:"pageNum"`
	List    []*User `json:"list"`
}

type UserName struct {
	Id   uint64 `json:"id"`
	Name string `json:"name"`
}
