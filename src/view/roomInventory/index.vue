<template>
  <div class="room-inventory">
    <aside>
      <tree></tree>
    </aside>
    <section>
      <header>
        <div class="left">
          <div class="group">
            <label>准确率低于</label>
            <el-input
              v-model="input.inventoryCoverage"
              size="small"
              placeholder=""
              clearable
            />
          </div>
          <div class="group">
            <label>覆盖率低于</label>
            <el-input
              v-model="input.inventoryAccuracy"
              size="small"
              placeholder=""
              clearable
            />
          </div>
        </div>
        <div class="right">
          <el-button
            class="btn"
            size="small"
            type="primary"
            @click="onMultipleInvent"
            >盘点</el-button
          >
          <!-- <el-button
            class="btn"
            size="small"
            type="primary"
            @click="onMultipleAnalysis"
            >分析</el-button
          > -->
          <el-dropdown class="export-drop">
            <el-button class="btn" type="primary" size="small">
              导出
              <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="onExportAll"
                  >全部统计数据</el-dropdown-item
                >
                <el-dropdown-item @click="onExportSelect"
                  >选中统计数据</el-dropdown-item
                >
                <el-dropdown-item @click="onExportSelectRes"
                  >选中盘点结果</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </header>
      <section>
        <common-table
          ref="table"
          :config="config"
          :dealListData="dealListData"
          :formatter="formatterData"
          @on-selection-change="(select) => (selectData = select)"
        >
          <el-table-column label="操作" width="120">
            <template v-slot="scope">
              <el-button
                @click.stop="onView(scope.row)"
                type="text"
                size="small"
                >查看</el-button
              >
              <el-button
                @click.stop="onInvent(scope.row)"
                type="text"
                size="small"
                >盘点</el-button
              >
              <!-- <el-button
                @click.stop="onAnalysis(scope.row)"
                type="text"
                size="small"
                >分析</el-button
              > -->
            </template>
          </el-table-column>
        </common-table>
      </section>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import Tree from "@/view/common/tree.vue";
import CommonTable from "@/component/elComponent/CommonTable.vue";
import {
  SearchType,
  getInventoryList,
  inventoryDo,
  exportAll,
  exportSelect,
  detailExportSelectRes,
} from "@/api/iot";
import { ElMessage } from "element-plus";
import { fileDownload } from "@/utils/tool";
import { useRouter } from "vue-router";

export enum statusMenu {
  盘点中 = 0,
  盘点完成 = 1,
}
export enum isChangeMenu {
  没变化 = 0,
  变化 = 1,
}
export enum isRiseMenu {
  无上升 = 0,
  上升 = 1,
}
export enum isDeclineMenu {
  无下降 = 0,
  下降 = 1,
}

// 列表 item
export interface InventoryItemType {
  resourceId: string;
  roomName: string; // 机房名称
  onlineDeviceCount: number; //线上设备数
  oldOnlineDeviceCount: number; //最近一次线上设备数
  offlineDeviceCount: number; //线下设备数
  oldOfflineDeviceCount: number; //最近一次线下设备数
  inventoryAccuracy: number; //盘点准确率
  oldInventoryAccuracy: number; //旧盘点准确率
  inventoryCoverage: number; //盘点覆盖率
  oldInventoryCoverage: number; //旧盘点覆盖率
  exceptionCount: number; //异常数
  normalCount: number; //正常数
  deviceLossCount: number; //设备丢失数
  oldDeviceLossCount: number; //旧设备丢失数
  illegalOnCount: number; //非法在架数
  oldIllegalOnCount: number; //旧非法在架数
  positionWrongCount: number; //位置错误数
  oldPositionWrongCount: number; //旧位置错误数
  notLabelCount: number; //未检测到标签数
  oldNotLabelCount: number; //旧未检测到标签数
  locationConflictCount: number; //位置冲突数
  oldLocationConflictCount: number; //旧位置冲突数
  status: 0 | 1; //盘点状态: 0:盘点中，1:盘点完成
  progress: string; //盘点进度
  isChange: 0 | 1; //0:没变化，1：变化
  isRise: 0 | 1; //0：无上升，1：上升
  isDecline: 0 | 1; //0：无下降，1：下降
  location: string; //位置
  locationCn: string; //位置
  updateTime: string; //更新时间
}
export default defineComponent({
  name: "RoomInventory",
  components: {
    Tree,
    CommonTable,
  },
  setup() {
    const router = useRouter();
    const tableDependence = reactive({
      input: {
        inventoryAccuracy: "",
        inventoryCoverage: "",
      },
      searchParam: {},
      selectData: [] as InventoryItemType[],
      config: {
        showSelection: true,
        columns: [
          {
            prop: "roomName",
            label: "机房名称",
            showTooltip: true,
          },
          {
            prop: "onlineDeviceCount",
            label: "线上设备数",
            showTooltip: true,
          },
          {
            prop: "offlineDeviceCount",
            label: "线下设备数",
            showTooltip: true,
          },
          {
            prop: "inventoryAccuracy",
            label: "盘点准确率%",
            sort: true,
            showTooltip: true,
          },
          {
            prop: "inventoryCoverage",
            label: "盘点覆盖率%",
            sort: true,
            showTooltip: true,
          },
          {
            prop: "normalCount",
            label: "正常设备",
            showTooltip: true,
          },
          {
            prop: "exceptionCount",
            label: "异常设备",
            showTooltip: true,
          },
          {
            prop: "deviceLossCount",
            label: "设备丢失",
            showTooltip: true,
          },
          {
            prop: "illegalOnCount",
            label: "非法在架",
            showTooltip: true,
          },
          {
            prop: "positionWrongCount",
            label: "位置错误",
            showTooltip: true,
          },
          {
            prop: "notLabelCount",
            label: "未检测到标签",
            showTooltip: true,
          },
          {
            prop: "status",
            label: "盘点状态",
            showTooltip: true,
          },
          {
            prop: "progress",
            label: "盘点进度",
            showTooltip: true,
          },
          {
            prop: "updateTime",
            label: "更新时间",
            showTooltip: true,
          },
          {
            prop: "locationCn",
            label: "位置",
            showTooltip: true,
          },
        ],
      },
      getParams: (): SearchType => {
        const { page, pageSize, sortObj } = tableDependence.searchParam as {
          page: number;
          pageSize: number;
          sortObj: { prop: string; order: string };
        };
        return {
          where: [
            {
              terms: [
                {
                  field: "inventoryAccuracy",
                  operator: "like",
                  value: `%${tableDependence.input.inventoryAccuracy}%`,
                },
                {
                  field: "inventoryCoverage",
                  operator: "like",
                  value: `%${tableDependence.input.inventoryCoverage}%`,
                },
              ],
            },
          ],
          sorts: [{ field: "roomName", type: "ASC" }],
          page: {
            number: page,
            size: pageSize,
          },
        };
      },
      dealListData: (
        page: number,
        pageSize: number,
        sortObj: { prop: string; order: string }
      ) => {
        Object.assign(tableDependence.searchParam, { page, pageSize, sortObj });

        return new Promise(async (res) => {
          console.log("dealListData");
          const { status, data, total } = await getInventoryList(
            tableDependence.getParams()
          );

          status === 200 ? res({ total, data }) : res({ total: 0, data: [] });
        });
      },
      formatterData: (row: InventoryItemType, column: any, cellVal: any) => {
        let res = "";
        switch (column.property) {
          case "status":
            res = statusMenu[cellVal];
            break;
          default:
            res = cellVal;
            break;
        }

        return res;
      },
      onView: (row: InventoryItemType) => {
        router.push({
          path: `/roomInventory/detail/${row.resourceId}`,
          query: {},
        });
      },
      onInvent: async (row: InventoryItemType) => {
        try {
          const { status, data, message } = await inventoryDo([`${row.location}/${row.resourceId}`]);
          if (status === 200) {
            ElMessage({ type: "success", message: message || "操作成功！" });
            return;
          }
          ElMessage({ type: "error", message: message || "操作失败！" });
        } catch (error) {
          console.log(error);
        }
      },
      onAnalysis: (row: InventoryItemType) => {
        // todo：盘点分析
        console.log(row);
      },
    });

    const onMultipleInvent = async () => {
      try {
        const { status, data, message } = await inventoryDo(
          tableDependence.selectData.map((it) => `${it.location}/${it.resourceId}`)
        );
        if (status === 200) {
          ElMessage({ type: "success", message: message || "操作成功！" });
          return;
        }
        ElMessage({ type: "error", message: message || "操作失败！" });
      } catch (error) {
        console.log(error);
      }
    };
    const onMultipleAnalysis = () => {
      // todo：盘点分析
    };
    const onExportAll = async () => {
      try {
        const { status, data, headers } = await exportAll(
          tableDependence.getParams()
        );
        if (status === 200 && data.size > 0) {
          let name = headers["content-disposition"].match(/filename=(.*)/)[1];
          fileDownload(data, decodeURI(name), false);
        } else {
          ElMessage({ type: "error", message: data?.message || "下载失败！" });
        }
      } catch (error) {
        console.log(error);
      }
    };
    const onExportSelect = async () => {
      try {
        const { status, data, headers } = await exportSelect(
          tableDependence.selectData.map((it) => it.resourceId)
        );
        if (status === 200 && data.size > 0) {
          let name = headers["content-disposition"].match(/filename=(.*)/)[1];
          fileDownload(data, decodeURI(name), false);
        } else {
          ElMessage({ type: "error", message: data?.message || "下载失败！" });
        }
      } catch (error) {
        console.log(error);
      }
    };
    const onExportSelectRes = async () => {
      try {
        const { status, data, headers } = await detailExportSelectRes(
          tableDependence.selectData.map((it) => it.resourceId)
        );
        if (status === 200 && data.size > 0) {
          let name = headers["content-disposition"].match(/filename=(.*)/)[1];
          fileDownload(data, decodeURI(name), false);
        } else {
          ElMessage({ type: "error", message: data?.message || "下载失败！" });
        }
      } catch (error) {
        console.log(error);
      }
    };

    return {
      ...toRefs(tableDependence),
      onMultipleInvent,
      onMultipleAnalysis,
      onExportAll,
      onExportSelect,
      onExportSelectRes,
    };
  },
});
</script>

<style lang="less" scoped>
.room-inventory {
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  display: flex;

  > aside {
  }
  > section {
    flex: 1;
    overflow: hidden;
    height: 100%;
    > header {
      height: 40px;
      display: flex;
      .left {
        flex: 1;
        display: flex;
        .group {
          display: flex;
          > label {
            margin: 0 0.25rem;
            min-width: 70px;
            line-height: 1.65rem;
            text-align: center;
          }
        }
      }
      .right {
        width: 260px;
        text-align: right;
        .btn {
          margin-left: 5px;
        }
      }
    }
    > section {
      height: calc(100% - 40px);
    }
  }
}
</style>
