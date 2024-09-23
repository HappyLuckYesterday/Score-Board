import webapi from "./gocliRequest"
import * as components from "./boardComponents"
export * from "./boardComponents"

/**
 * @description "create group"
 * @param req
 */
export function createGroup(req: components.CreateGroupRequest) {
	return webapi.post<components.CreateGroupResponse>(`http://localhost:5000/board/api/group/create`, req)
}

/**
 * @description "delete group"
 * @param req
 */
export function deleteGroup(req: components.DeleteGroupRequest) {
	return webapi.post<components.DeleteGroupResponse>(`http://localhost:5000/board/api/group/delete`, req)
}

/**
 * @description "get group detail"
 * @param params
 */
export function getGroupDetail(params: components.GroupDetailRequestParams, id: number) {
	return webapi.get<components.Group>(`http://localhost:5000/board/api/group/detail/${id}`, params)
}

/**
 * @description "get group list"
 * @param req
 */
export function getGroupList(req: components.GroupListRequest) {
	return webapi.post<components.GroupListResponse>(`http://localhost:5000/board/api/group/list`, req)
}

/**
 * @description "update group"
 * @param req
 */
export function updateGroup(req: components.UpdateGroupRequest) {
	return webapi.post<components.UpdateGroupResponse>(`http://localhost:5000/board/api/group/update`, req)
}

/**
 * @description "create score"
 * @param req
 */
export function createScore(req: components.CreateScoreRequest) {
	return webapi.post<components.CreateScoreResponse>(`http://localhost:5000/board/api/score/create`, req)
}

/**
 * @description "delete score"
 * @param req
 */
export function deleteScore(req: components.DeleteScoreRequest) {
	return webapi.post<components.DeleteScoreResponse>(`http://localhost:5000/board/api/score/delete`, req)
}

/**
 * @description "get score detail"
 * @param params
 */
export function getScoreDetail(params: components.ScoreDetailRequestParams, id: number) {
	return webapi.get<components.Score>(`http://localhost:5000/board/api/score/detail/${id}`, params)
}

/**
 * @description "get score list"
 * @param req
 */
export function getScoreList(req: components.ScoreListRequest) {
	return webapi.post<components.ScoreListResponse>(`http://localhost:5000/board/api/score/list`, req)
}

/**
 * @description "update score"
 * @param req
 */
export function updateScore(req: components.UpdateScoreRequest) {
	return webapi.post<components.UpdateScoreResponse>(`http://localhost:5000/board/api/score/update`, req)
}

/**
 * @description "create subject"
 * @param req
 */
export function createSubject(req: components.CreateSubjectRequest) {
	return webapi.post<components.CreateSubjectResponse>(`http://localhost:5000/board/api/subject/create`, req)
}

/**
 * @description "delete subject"
 * @param req
 */
export function deleteSubject(req: components.DeleteSubjectRequest) {
	return webapi.post<components.DeleteSubjectResponse>(`http://localhost:5000/board/api/subject/delete`, req)
}

/**
 * @description "get subject detail"
 * @param params
 */
export function getSubjectDetail(params: components.SubjectDetailRequestParams, id: number) {
	return webapi.get<components.Subject>(`http://localhost:5000/board/api/subject/detail/${id}`, params)
}

/**
 * @description "get subject list"
 * @param req
 */
export function getSubjectList(req: components.SubjectListRequest) {
	return webapi.post<components.SubjectListResponse>(`http://localhost:5000/board/api/subject/list`, req)
}

/**
 * @description "update subject"
 * @param req
 */
export function updateSubject(req: components.UpdateSubjectRequest) {
	return webapi.post<components.UpdateSubjectResponse>(`http://localhost:5000/board/api/subject/update`, req)
}

/**
 * @description "create subscribe"
 * @param req
 */
export function createSubscribe(req: components.CreateSubscribeRequest) {
	return webapi.post<components.CreateSubscribeResponse>(`http://localhost:5000/board/api/subscribe/create`, req)
}

/**
 * @description "delete subscribe"
 * @param req
 */
export function deleteSubscribe(req: components.DeleteSubscribeRequest) {
	return webapi.post<components.DeleteSubscribeResponse>(`http://localhost:5000/board/api/subscribe/delete`, req)
}

/**
 * @description "get subscribe detail"
 * @param params
 */
export function getSubscribeDetail(params: components.SubscribeDetailRequestParams, id: number) {
	return webapi.get<components.Subscribe>(`http://localhost:5000/board/api/subscribe/detail/${id}`, params)
}

/**
 * @description "get subscribe list"
 * @param req
 */
export function getSubscribeList(req: components.SubscribeListRequest) {
	return webapi.post<components.SubscribeListResponse>(`http://localhost:5000/board/api/subscribe/list`, req)
}

/**
 * @description "update subscribe"
 * @param req
 */
export function updateSubscribe(req: components.UpdateSubscribeRequest) {
	return webapi.post<components.UpdateSubscribeResponse>(`http://localhost:5000/board/api/subscribe/update`, req)
}

/**
 * @description "login"
 * @param req
 */
export function login(req: components.LoginRequest) {
	return webapi.post<components.LoginResponse>(`http://localhost:5000/board/api/auth/login`, req)
}

/**
 * @description "register"
 * @param req
 */
export function register(req: components.RegisterRequest) {
	return webapi.post<components.RegisterResponse>(`http://localhost:5000/board/api/auth/signup`, req)
}

/**
 * @description "add user"
 * @param req
 */
export function addUser(req: components.AddUserRequest) {
	return webapi.post<components.AddUserResponse>(`http://localhost:5000/board/api/user/add`, req)
}

/**
 * @description "delete user"
 * @param req
 */
export function deleteUser(req: components.DeleteUserRequest) {
	return webapi.post<components.DeleteUserResponse>(`http://localhost:5000/board/api/user/delete`, req)
}

/**
 * @description "get user detail"
 */
export function getUserDetailByUserId() {
	return webapi.get<components.UserDetailResponse>(`http://localhost:5000/board/api/user/detail`, {})
}

/**
 * @description "get user detail"
 * @param params
 */
export function getUserDetail(params: components.UserDetailRequestParams, id: number) {
	return webapi.get<components.UserDetailResponse>(`http://localhost:5000/board/api/user/detail/${id}`, params)
}

/**
 * @description "get user list"
 * @param req
 */
export function getUserList(req: components.UserListRequest) {
	return webapi.post<components.UserListResponse>(`http://localhost:5000/board/api/user/list`, req)
}

/**
 * @description "user name list"
 */
export function getUserNameList() {
	return webapi.get<components.UserName>(`http://localhost:5000/board/api/user/namelist`, {})
}

/**
 * @description "update user password"
 * @param req
 */
export function updateUserPassword(req: components.UpdateUserPasswordRequest) {
	return webapi.put<components.UpdateUserPasswordResponse>(`http://localhost:5000/board/api/user/password`, req)
}

/**
 * @description "update user"
 * @param req
 */
export function updateUser(req: components.UpdateUserRequest) {
	return webapi.post<components.UpdateUserResponse>(`http://localhost:5000/board/api/user/update`, req)
}

/**
 * @description "update user detail"
 * @param req
 */
export function updateUserDetail(req: components.UpdateUserDetailRequest) {
	return webapi.put<components.UpdateUserDetailResponse>(`http://localhost:5000/board/api/user/updatedetail`, req)
}
