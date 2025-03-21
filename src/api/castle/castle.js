import request from "@/router/axios";

export function getCastleStatistics() {
  return request({
    url: "/api/blade-castle/admin/web/game/castle/statistics",
    method: "get",
  });
}

export function getCastleRoomStatistics() {
  return request({
    url: "/api/blade-castle/admin/web/game/castle/room/statistics",
    method: "get",
  });
}

export function getCastleUserStatistics(data) {
  return request({
    url: "/api/blade-castle/admin/web/game/castle/user/statistics",
    method: "post",
    data: data
  });
}

export function getCastleIncome(data) {
  return request({
    url: "/api/blade-castle/admin/web/game/castle/income",
    method: "post",
    data: data
  });
}

export function getCastleRoomConfigList(data) {
    return request({
      url: "/api/blade-castle/admin/web/game/castle/room/config/list",
      method: "post",
      data: data
    });
  }

  export function getCastleRoomConfigEdit(data) {
    return request({
      url: "/api/blade-castle/admin/web/game/castle/room/config/edit",
      method: "post",
      data: data
    });
  }
 
