<template>
  <div style="height:100%">
    <div class="report-form-top">
      <div style="padding: 15px 5px;">
        <Form :label-width="70">
          <Row>
            <Col :span="6">
              <FormItem label="人员列表">
                <AutoComplete
                  size="small"
                  v-model="areaModel.areaName"
                  :data="autoAreas"
                  @on-search="handleSearch"
                  placeholder="请输入"
                  clearable
                ></AutoComplete>
              </FormItem>
            </Col>
            <Col :span="6">
              <FormItem label="起始日期">
                <DatePicker
                  size="small"
                  style="width: 100%"
                  placeholder="请选择日期区间"
                  type="date"
                  v-model="areaModel.createTimeRange"
                  clearable
                ></DatePicker>
              </FormItem>
            </Col>
            <Col :span="6">
              <FormItem label="截止日期">
                <DatePicker
                  size="small"
                  style="width: 100%"
                  placeholder="请选择日期区间"
                  type="date"
                  v-model="areaModel.createTimeRange"
                  clearable
                ></DatePicker>
              </FormItem>
            </Col>
            <Col :span="6">
              <div class="report-form-search">
                <Button size="small" @click.native="searchArea" type="warning" icon="search">查询</Button>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
      <div class="newFormBtn"></div>
    </div>
    <div class="report-content-table single-table-con" >
      <div style="margin:0 auto;width: 75%; height: 100%;overflow: auto;">
        <table class="x-table" style="width:100%;" cellspacing="0" id="reportTable" cellpadding="0">
            <colgroup>
                <col style="width:54px;" col="2">
                <col style="width:105px;" col="3">
                <col style="width:235px;" col="4">
                <col style="width:223px;" col="5">
                <col style="width:75px;" col="6">
                <col style="width:59px;" col="7">
                <col style="width:72px;" col="8">
            </colgroup>
            <tbody class="rows-height-counter">
                <tr style="height:19px;" tridx="0" id="r-0-0">
                    <td style="display:none;" id="A1-0-38257"></td>
                    <td style="display:none;" id="B1-0-38257"></td>
                    <td class="fh tac bw f10-0 pl2 b1"  colspan="5"
                        id="C1-0-38257"></td>
                    <td class="fh tac bw f10-0 pl2 b1"  id="H1-0-38257">
                    </td>
                    <td class="fh tac bw f10-0 pl2 b1"  id="I1-0-38257">
                    </td>
                    <td style="display:none;" id="J1-0-38257"></td>
                </tr>
                <tr style="height:19px;" tridx="1" id="r-1-0">
                    <td class="fh tac bw f10-0 pl2 b1"  colspan="2"
                        id="C2-0-38257">姓名</td>
                    <td class="fh tac bw f10-0 pl2 b1"  id="E2-0-38257">
                    </td>
                    <td class="fh tac bw f10-0 pl2 b1"  id="F2-0-38257">部门
                    </td>
                    <td class="fh tac bw f10-0 pl2 b1"  id="G2-0-38257">
                    </td>
                    <td class="fh tac bw f10-0 pl2 b1"  id="H2-0-38257">日期
                    </td>
                    <td class="fh tac bw f10-0 pl2 b1"  id="I2-0-38257">
                    </td>
                    <td style="display:none;" id="J2-0-38257"></td>
                </tr>
                <tr style="height:53px;" tridx="2" id="r-2-0">
                    <td class="fh tac bw f10-0 pl2 b1"  colspan="2"
                        id="C3-0-38257">当日里程（Km）</td>
                    <td class="fh tac bw f10-0 pl2 b1"  >
                    </td>
                    <td class="fh tac bw f10-0 pl2 b1"  >
                        在线时长(分钟)</td>
                    <td class="fh tac bw f10-0 pl2 b1"  >
                    </td>
                    <td class="fh tac bw f10-0 pl2 b1" >
                        平均时速(Km/h)</td>
                    <td class="fh tac bw f10-0 pl2 b1"  >
                        0.00</td>
                    <td style="display:none;" ></td>
                </tr>
                <tr style="height:19px;" tridx="3" id="r-3-0">
                    <td class="fh tac bw f10-0 pl2 b1"  colspan="2"
                        id="C4-0-38257">在线时间段</td>
                    <td class="fh tac bw f10-0 pl2 b1"  colspan="5"
                        id="E4-0-38257"></td>
                    <td style="display:none;" id="J4-0-38257"></td>
                </tr>
                <tr style="height:22px;" tridx="4" id="r-4-0">
                    <td class="fh tac bw f10-0 pl2 b1"  colspan="2"
                        id="C5-0-38257">分类</td>
                    <td class="fh tac bw f10-0 pl2 b1"  id="E5-0-38257">序号
                    </td>
                    <td class="fh tac bw f10-0 pl2 b1"  id="F5-0-38257">周期
                    </td>
                    <td class="fh tac bw f10-0 pl2 b1"  id="G5-0-38257">
                        完成情况</td>
                    <td class="fh bw f10-0 pl2 b0"  id="H5-0-38257">任务量
                    </td>
                    <td class="fh bw f10-0 pl2 b1"  id="I5-0-38257">完成率
                    </td>
                    <td style="display:none;" id="J5-0-38257"></td>
                </tr>
                <tr style="height:22px;" tridx="5" id="r-5-0">
                    <td class="fh tac bw f10-0 pl2 b1"  colspan="2"
                        id="C6-0-38257">巡查</td>
                    <td class="fh tac bw f10-0 pl2 b1"  id="E6-0-38257">
                    </td>
                    <td class="fh tac bw f10-0 pl2 b1"  id="F6-0-38257">
                    </td>
                    <td class="fh tac bw f10-0 pl2 b1"  id="G6-0-38257">
                    </td>
                    <td class="fh tac bw f10-0 pl2 b1"  id="H6-0-38257">
                    </td>
                    <td class="fh tac bw f10-0 pl2 b1"  id="I6-0-38257">
                    </td>
                    <td style="display:none;" id="J6-0-38257"></td>
                </tr>
                <tr style="height:22px;" tridx="6" id="r-6-0">
                    <td class="fh tac bw f10-0 pl2 b1"  colspan="2"
                        id="C7-0-38257">检漏</td>
                    <td class="fh tac bw f10-0 pl2 b1"  id="E7-0-38257">
                    </td>
                    <td class="fh tac bw f10-0 pl2 b1"  id="F7-0-38257">
                    </td>
                    <td class="fh tac bw f10-0 pl2 b1"  id="G7-0-38257">
                    </td>
                    <td class="fh tac bw f10-0 pl2 b1"  id="H7-0-38257">
                    </td>
                    <td class="fh tac bw f10-0 pl2 b1"  id="I7-0-38257">
                    </td>
                    <td style="display:none;" id="J7-0-38257"></td>
                </tr>
                <tr style="height:19px;" tridx="7" id="r-7-0">
                    <td class="fh tac bw f10-0 pl2 b1"  colspan="2"
                        id="C8-0-38257">隐患</td>
                    <td class="fh tac bw f10-0 pl2 b1"  id="E8-0-38257">序号
                    </td>
                    <td class="fh tac bw f10-0 pl2 b1"  id="F8-0-38257">名称
                    </td>
                    <td class="fh tac bw f10-0 pl2 b1"  id="G8-0-38257">状态
                    </td>
                    <td class="fh tac bw f10-0 pl2 b1"  colspan="2"
                        id="H8-0-38257">时间</td>
                    <td style="display:none;" id="J8-0-38257"></td>
                </tr>
                <tr style="height:19px;" tridx="8" id="r-8-0">
                    <td class="fh bw f10-0 pl2 b1"  id="C9-0-38257">上报：
                    </td>
                    <td class="fh bw f10-0 pl2 br0 bb1 bbw1 bbss bbcb bl0 bt1 btw1 btss btcb"
                         id="D9-0-38257">0</td>
                    <td class="fh tac bw f10-0 pl2 b1"  id="E9-0-38257">
                    </td>
                    <td class="fh tac bw f10-0 pl2 b1"  id="F9-0-38257">
                    </td>
                    <td class="fh tac bw f10-0 pl2 b1"  id="G9-0-38257">
                    </td>
                    <td class="fh tac bw f10-0 pl2 b1"  colspan="2"
                        id="H9-0-38257"></td>
                    <td style="display:none;" id="J9-0-38257"></td>
                </tr>
                <tr style="height:19px;" tridx="9" id="r-9-0">
                    <td class="fh bw f10-0 pl2 br0 bb0 bl1 blw1 blss blcb bt0"
                         id="C10-0-38257">处理：</td>
                    <td class="fh bw f10-0 pl2 br0 bb1 bbw1 bbss bbcb bl0 bt1 btw1 btss btcb"
                         id="D10-0-38257">0</td>
                    <td class="fh tac bw f10-0 pl2 b1"  id="E10-0-38257">
                    </td>
                    <td class="fh tac bw f10-0 pl2 b1"  id="F10-0-38257">
                    </td>
                    <td class="fh tac bw f10-0 pl2 b1"  id="G10-0-38257">
                    </td>
                    <td class="fh tac bw f10-0 pl2 b1"  colspan="2"
                        id="H10-0-38257"></td>
                    <td style="display:none;" id="J10-0-38257"></td>
                </tr>
                <tr style="height:19px;" tridx="10" id="r-10-0">
                    <td class="fh tac bw f10-0 pl2 b1"  colspan="2"
                        id="C11-0-38257">工地</td>
                    <td class="fh tac bw f10-0 pl2 b1"  id="E11-0-38257">序号
                    </td>
                    <td class="fh tac bw f10-0 pl2 b1"  id="F11-0-38257">名称
                    </td>
                    <td class="fh tac bw f10-0 pl2 b1"  id="G11-0-38257">状态
                    </td>
                    <td class="fh tac bw f10-0 pl2 b1"  colspan="2"
                        id="H11-0-38257">时间</td>
                    <td style="display:none;" id="J11-0-38257"></td>
                </tr>
                <tr style="height:19px;" tridx="11" id="r-11-0">
                    <td class="fh bw f10-0 pl2 b1"  id="C12-0-38257">登记：
                    </td>
                    <td class="fh bw f10-0 pl2 br0 bb1 bbw1 bbss bbcb bl0 bt1 btw1 btss btcb"
                         id="D12-0-38257">0</td>
                    <td class="fh tac bw f10-0 pl2 b1"  id="E12-0-38257">
                    </td>
                    <td class="fh tac bw f10-0 pl2 b1"  id="F12-0-38257">
                    </td>
                    <td class="fh tac bw f10-0 pl2 b1"  id="G12-0-38257">
                    </td>
                    <td class="fh tac bw f10-0 pl2 b1"  colspan="2"
                        id="H12-0-38257"></td>
                    <td style="display:none;" id="J12-0-38257"></td>
                </tr>
                <tr style="height:19px;" tridx="12" id="r-12-0">
                    <td class="fh bw f10-0 pl2 b1"  id="C13-0-38257">跟进：
                    </td>
                    <td class="fh bw f10-0 pl2 br0 bb1 bbw1 bbss bbcb bl0 bt1 btw1 btss btcb"
                         id="D13-0-38257">0</td>
                    <td class="fh tac bw f10-0 pl2 b1"  id="E13-0-38257">
                    </td>
                    <td class="fh tac bw f10-0 pl2 b1"  id="F13-0-38257">
                    </td>
                    <td class="fh tac bw f10-0 pl2 b1"  id="G13-0-38257">
                    </td>
                    <td class="fh tac bw f10-0 pl2 b1"  colspan="2"
                        id="H13-0-38257"></td>
                    <td style="display:none;" id="J13-0-38257"></td>
                </tr>
                <tr style="height:19px;" tridx="13" id="r-13-0">
                    <td class="fh tac bw f10-0 pl2 b1"  rowspan="6"
                        colspan="2" id="C14-0-38257">临时任务</td>
                    <td class="fh tac bw f10-0 pl2 b1"  id="E14-0-38257">内容
                    </td>
                    <td class="fh tac bw f10-0 pl2 b1"  colspan="4"
                        id="F14-0-38257"></td>
                    <td style="display:none;" id="J14-0-38257"></td>
                </tr>
                <tr style="height:19px;" tridx="14" id="r-14-0">
                    <td class="fh tac bw f10-0 pl2 b1"  id="E15-0-38257">
                        任务地点</td>
                    <td class="fh tac bw f10-0 pl2 b1"  id="F15-0-38257">
                    </td>
                    <td class="fh tac bw f10-0 pl2 b1"  id="G15-0-38257">
                        派发人</td>
                    <td class="fh tac bw f10-0 pl2 b1"  colspan="2"
                        id="H15-0-38257"></td>
                    <td style="display:none;" id="J15-0-38257"></td>
                </tr>
                <tr style="height:19px;" tridx="15" id="r-15-0">
                    <td class="fh tac bw f10-0 pl2 b1"  id="E16-0-38257">
                        开始时间</td>
                    <td class="fh tac bw f10-0 pl2 b1"  id="F16-0-38257">
                    </td>
                    <td class="fh tac bw f10-0 pl2 b1"  id="G16-0-38257">
                        结束时间</td>
                    <td class="fh tac bw f10-0 pl2 b1"  colspan="2"
                        id="H16-0-38257"></td>
                    <td style="display:none;" id="J16-0-38257"></td>
                </tr>
                <tr style="height:19px;" tridx="16" id="r-16-0">
                    <td class="fh tac bw f10-0 pl2 b1"  colspan="5"
                        id="E17-0-38257">任务记录</td>
                    <td style="display:none;" id="J17-0-38257"></td>
                </tr>
                <tr style="height:19px;" tridx="17" id="r-17-0">
                    <td class="fh bw f10-0 pl2 br1 brw1 brss brcb bb0 bl1 blw1 blss blcb bt0"
                         colspan="5" id="E18-0-38257"></td>
                    <td style="display:none;" id="J18-0-38257"></td>
                </tr>
                <tr style="height:19px;" tridx="18" id="r-18-0">
                    <td class="fh bw f10-0 pl2 br0 bb0 bl1 blw1 blss blcb bt0"
                         id="E19-0-38257"></td>
                    <td class="fh bw f10-0 pl2 b0"  id="F19-0-38257"></td>
                    <td class="fh bw f10-0 pl2 br1 brw1 brss brcb bb0 bl0 bt0"
                         colspan="3" id="G19-0-38257"></td>
                    <td style="display:none;" id="J19-0-38257"></td>
                </tr>
                <tr style="height:19px;" tridx="19" id="r-19-0">
                    <td class="fh tac bw f10-0 pl2 b1"  rowspan="2"
                        colspan="2" id="C20-0-38257">工作记事</td>
                    <td class="fh bw f10-0 pl2 br0 bb0 bl1 blw1 blss blcb bt1 btw1 btss btcb"
                         colspan="2" id="E20-0-38257"></td>
                    <td class="fh tac bw f10-0 pl2 br0 bb0 bl0 bt1 btw1 btss btcb"
                         id="G20-0-38257"></td>
                    <td class="fh tac bw f10-0 pl2 br0 bb0 bl0 bt1 btw1 btss btcb"
                         id="H20-0-38257"></td>
                    <td class="fh tac bw f10-0 pl2 br1 brw1 brss brcb bb0 bl0 bt1 btw1 btss btcb"
                         id="I20-0-38257"></td>
                    <td style="display:none;" id="J20-0-38257"></td>
                </tr>
                <tr style="height:19px;" tridx="20" id="r-20-0">
                    <td class="fh tac bw f10-0 pl2 br0 bb1 bbw1 bbss bbcb bl1 blw1 blss blcb bt0"
                         id="E21-0-38257"></td>
                    <td class="fh bw f10-0 pl2 br0 bb1 bbw1 bbss bbcb bl0 bt0"
                         id="F21-0-38257"></td>
                    <td class="fh tac bw f10-0 pl2 br0 bb1 bbw1 bbss bbcb bl0 bt0"
                         id="G21-0-38257"></td>
                    <td class="fh tac bw f10-0 pl2 br0 bb1 bbw1 bbss bbcb bl0 bt0"
                         id="H21-0-38257"></td>
                    <td class="fh bw f10-0 pl2 br1 brw1 brss brcb bb1 bbw1 bbss bbcb bl0 bt0"
                         id="I21-0-38257"></td>
                    <td style="display:none;" id="J21-0-38257"></td>
                </tr>
            </tbody>
        </table>
      </div>
    </div>
    <div class="x-toolbar ui-state-enabled"
        style="height: 28px; border-width: 0px; padding: 0px; left: 0px; bottom: 0px; width: 1334px; position: absolute;">
        <table cellspacing="0" style="height: 28px;">
            <tbody>
                <tr>
                    <td>
                        <div class="fr-btn ui-state-disabled" widgetname="First">
                            <div id="fr-btn-First" class="fr-btn-up  fr-btn-text-icon"
                                style="height:NaNpx;width:autopx;display:table-cell;">
                                <div class="fr-btn-small fr-btn-icon-small-left"><em unselectable="on"><button
                                            unselectable="none" type="button" data-role="none" style="width:45px"
                                            class="fr-btn-text x-emb-first">首页</button></em></div>
                            </div>
                        </div>
                    </td>
                    <td><span class="sep"> </span></td>
                    <td>
                        <div class="fr-btn ui-state-disabled" widgetname="Previous">
                            <div id="fr-btn-Previous" class="fr-btn-up  fr-btn-text-icon"
                                style="height:NaNpx;width:autopx;display:table-cell;">
                                <div class="fr-btn-small fr-btn-icon-small-left"><em unselectable="on"><button
                                            unselectable="none" type="button" data-role="none" style="width:60px"
                                            class="fr-btn-text x-emb-previous">上一页</button></em></div>
                            </div>
                        </div>
                    </td>
                    <td><span class="sep"> </span></td>
                    <td>
                        <div class="ui-state-enabled" style="position: relative;">
                            <div class="fr-horizontalboxlayout ui-state-enabled"
                                style="overflow: hidden; width: 90px; height: 24px; position: relative;">
                                <div class="ui-state-enabled"
                                    style="width: 50px; height: 20px; left: 0px; top: 2px; position: absolute;"><input
                                        type="text" name="" class="fr-texteditor"
                                        style="font-size: 12px; width: 42px; height: 16px; text-align: center;"></div>
                                <div class="ui-state-enabled"
                                    style="width: 40px; height: 20px; overflow: hidden; left: 50px; top: 2px; position: absolute;">
                                    <table cellpadding="0" cellspacing="0"
                                        style="table-layout: fixed; width: 40px; height: 20px; text-size-adjust: none;">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <pre class="fr-label"
                                                        style="font-size: 12px; color: rgb(0, 0, 0); text-decoration: none; text-align: center; font-family: SimSun; overflow-wrap: break-word; white-space: pre-wrap; width: 40px;">/1</pre>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </td>
                    <td><span class="sep"> </span></td>
                    <td>
                        <div class="fr-btn ui-state-disabled" widgetname="Next">
                            <div id="fr-btn-Next" class="fr-btn-up  fr-btn-text-icon"
                                style="height:NaNpx;width:autopx;display:table-cell;">
                                <div class="fr-btn-small fr-btn-icon-small-left"><em unselectable="on"><button
                                            unselectable="none" type="button" data-role="none" style="width:60px"
                                            class="fr-btn-text x-emb-next">下一页</button></em></div>
                            </div>
                        </div>
                    </td>
                    <td><span class="sep"> </span></td>
                    <td>
                        <div class="fr-btn ui-state-disabled" widgetname="Last">
                            <div id="fr-btn-Last" class="fr-btn-up  fr-btn-text-icon"
                                style="height:NaNpx;width:autopx;display:table-cell;">
                                <div class="fr-btn-small fr-btn-icon-small-left"><em unselectable="on"><button
                                            unselectable="none" type="button" data-role="none" style="width:45px"
                                            class="fr-btn-text x-emb-last">末页</button></em></div>
                            </div>
                        </div>
                    </td>
                    <td><span class="sep"> </span></td>
                    <td>
                        <div class="fr-btn ui-state-enabled" widgetname="NewPrint">
                            <div id="fr-btn-NewPrint" class="fr-btn-up  fr-btn-text-icon"
                                style="height:NaNpx;width:autopx;display:table-cell;">
                                <div class="fr-btn-small fr-btn-icon-small-left"><em unselectable="on"><button
                                            unselectable="none" type="button" data-role="none" style="width:45px"
                                            class="fr-btn-text x-emb-print">打印</button></em></div>
                            </div>
                        </div>
                    </td>
                    <td><span class="sep"> </span></td>
                    <td>
                        <div class="fr-btn ui-state-enabled" widgetname="ExcelO">
                            <div id="fr-btn-ExcelO" class="fr-btn-up  fr-btn-icon"
                                style="height:NaNpx;width:autopx;display:table-cell;">
                                <div class="fr-btn-small fr-btn-icon-small-left"><em unselectable="on"><button
                                            unselectable="none" type="button" data-role="none" 
                                            class="fr-btn-text x-emb-excel"></button></em></div>
                            </div>
                        </div>
                    </td>
                    <td><span class="sep"> </span></td>
                    <td>
                        <div class="fr-btn ui-state-enabled" widgetname="CustomToolBarButton">
                            <div id="fr-btn-CustomToolBarButton" class="fr-btn-up  fr-btn-noicon"
                                style="height:NaNpx;width:autopx;display:table-cell;">共条</div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      areaModel: {}
    };
  },
  created() {},
  mounted() {},
  destroyed() {},
  computed: {},
  methods: {},
  watch: {}
};
</script>
<style lang="less" scoped>
.ivu-form-item {
  margin-bottom: 16px;
}
.report-form-top {
  background: rgb(247, 248, 250);
  position: relative;
}
.report-form-search {
  margin-bottom: 16px;
  vertical-align: top;
  zoom: 1;
  text-align: center;
  line-height: 32px;
}
.report-content-table {
  height: calc(100% - 106px);
  text-align: center;
  padding-top: 20px;
}
.newFormBtn {
  vertical-align: middle;
  position: absolute;
  cursor: pointer;
  background: url("http://10.0.197.2:8080//webroot/decision/view/report?op=resource&resource=/com/fr/web/images/edit/para_colla_up.png")
    no-repeat;
  background: url("http://10.0.197.2:8080//webroot/decision/view/report?op=resource&resource=/com/fr/web/images/edit/para_colla_down.png") no-repeat;
  left: 45%;
  bottom: 0px;
  width: 120px;
  height: 8px;
  position: absolute;
}
.x-table {
    table-layout: fixed;
    border-collapse: collapse;
    word-break: break-all;
    overflow: visible;
    td{
      font-family:微软雅黑;
    }
}
.b1 {
    border: 1px solid #000;
}
.pl2 {
    padding-left: 2px;
    padding-left: 0;
}
.tac {
    text-align: center;
}
.f10-0 {
    font-size: 10pt;
}
.fh {
    overflow: hidden;
    padding: 0;
    vertical-align: middle;
}
.bw {
    word-wrap: break-word;
}
.b0 {
    border: 0;
}
.bbss {
    border-bottom-style: solid;
}
.btss {
    border-top-style: solid;
}
.bbw1 {
    border-bottom-width: 1px;
}
.btw1 {
    border-top-width: 1px;
}
.bbcb {
    border-bottom-color: #000;
}
.btcb {
    border-top-color: #000;
}
.br0 {
    border-right: 0;
}
.bl0 {
    border-left: 0;
}
.brss {
    border-right-style: solid;
}
.blss {
    border-left-style: solid;
}
.brw1 {
    border-right-width: 1px;
}
.blw1 {
    border-left-width: 1px;
}
.brcb {
    border-right-color: #000;
}
.blcb {
    border-left-color: #000;
}
.bb0 {
    border-bottom: 0;
}
.bt0 {
    border-top: 0;
}
</style>