<template>
  <div
    :style="{height:iconSize, width:iconSize}"
    class="gradientPickerC"
    style="display:inline-block;position: relative;line-height: normal;border:1px solid #e6e6e6;border-radius:4px;outline:none;"
  >
    <el-tooltip :disabled="!tooltip" :open-delay="500" :content="tooltip" effect="dark" placement="bottom">
      <div
        @click="showPanel"
        class="gradientPicker"
        style="position:absolute;top:3px;bottom:3px;left:3px;right:3px;border:1px solid #e6e6e6;border-radius:4px;cursor:pointer;"
      >
        <div
          style="position:absolute;z-index:2;top: 50%;left: 50%;margin-left: -8px;margin-top: -9px;color: #fff;"
        >
          <i class="iconfont icon-jiantou"></i>
        </div>
        <div
          class="gradientPicker_trigger"
          style="position:absolute;width:100%;height:100%;z-index:1"
        ></div>
        <div
          style="position:absolute;width:100%;height:100%;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAGUlEQVQYV2M4gwH+YwCGIasIUwhT25BVBADtzYNYrHvv4gAAAABJRU5ErkJggg==)"
        ></div>
      </div>
    </el-tooltip>

    <div
      :style="{top:showPanelTop, left:showPanelLeft}"
      @mouseover="hideTooltip"
      style="position:fixed;z-index:9999;left:100px;;width:380px;height:310px;background:#fff;border:1px solid #dadada;border-radius: 4px;box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);padding:6px;    box-sizing: unset;"
      v-show="isShowPanel"
    >
      <el-tabs :stretch="true" type="card" v-model="colorType">
        <el-tab-pane name="1">
          <span slot="label">单色</span>

          <el-row>
            <el-col>
              <input class="gradientPicker-color-flat" style="display: none;" type="text">
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane :disabled="disable" name="2">
          <span slot="label">{{disable ? '此配置不支持渐变' : '渐变'}}</span>
          <el-row>
            <el-col>
              <div
                @click="setdefaultColor(item)"
                style="position:relative;height:16px;width:16px;display:inline-block;border-radius:3px;background:red;margin-right:2px;cursor:pointer;"
                v-for="item in defaultColorList"
              >
                <div
                  :style="{background:getColorByBrowser(item)}"
                  style="position:absolute;width:100%;height:100%;z-index:2;"
                ></div>
                <div
                  style="position:absolute;width:100%;height:100%;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAGUlEQVQYV2M4gwH+YwCGIasIUwhT25BVBADtzYNYrHvv4gAAAABJRU5ErkJggg==)"
                ></div>
              </div>

              <div
                style="height:16px;width:1px;display:inline-block;background:#E4E7ED;margin-right:2px;"
              ></div>

              <div
                @click="setdefaultColor(item)"
                style="position:relative;height:16px;width:16px;display:inline-block;border-radius:3px;background:red;margin-right:2px;cursor:pointer;"
                v-for="item in selectedColorList"
              >
                <div
                  :style="{background:getColorByBrowser(item)}"
                  style="position:absolute;width:100%;height:100%;z-index:2;"
                ></div>
                <div
                  style="position:absolute;width:100%;height:100%;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAGUlEQVQYV2M4gwH+YwCGIasIUwhT25BVBADtzYNYrHvv4gAAAABJRU5ErkJggg==)"
                ></div>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-button-group style="margin-top: 2px;">
                <el-tooltip class="item" content="添加触点" effect="dark" placement="top">
                  <el-button
                    @click="addColorStop"
                    round
                    size="mini"
                    style="padding: 5px 10px;"
                    type="danger"
                  >
                    <i class="iconfont icon-jia" style="font-size:12px;"></i>
                  </el-button>
                </el-tooltip>

                <el-tooltip class="item" content="删除触点" effect="dark" placement="top">
                  <el-button
                    @click="deleteStop"
                    round
                    size="mini"
                    style="padding: 5px 10px;"
                    type="danger"
                  >
                    <i class="iconfont icon-jianshao" style="font-size:12px;"></i>
                  </el-button>
                </el-tooltip>
              </el-button-group>
            </el-col>
            <el-col :span="12">
              <el-radio-group size="mini" v-model="gradientType">
                <el-radio-button label="linear">线性</el-radio-button>
                <el-radio-button label="radial">径向</el-radio-button>
              </el-radio-group>
            </el-col>
            <el-col :span="6">
              <el-switch
                @change="reverseOp"
                active-text="反向"
                style="margin-top: 4px;"
                v-model="reverse"
              ></el-switch>
            </el-col>
          </el-row>

          <el-row>
            <el-col>
              <div
                class="gradientPicker_container"
                style="background:white;border:5px solid #fff;border-radius:2px;-webkit-border-radius:2px;-moz-border-radius:2px;-o-border-radius:2px;"
              >
                <div
                  class="gradientPicker_panel"
                  style="width: 360px;height: 42px;border: 1px solid #ccc;position:relative;"
                >
                  <canvas
                    @click="clickChangeColor"
                    height="84"
                    style="width: 360px;height: 42px;cursor:crosshair;position:absolute;left:0px;top:0px;z-index:2"
                    width="720"
                  ></canvas>
                  <div
                    style="position:absolute;width:100%;height:100%;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAGUlEQVQYV2M4gwH+YwCGIasIUwhT25BVBADtzYNYrHvv4gAAAABJRU5ErkJggg==)"
                  ></div>
                </div>
                <div
                  @click="addColorStop('#000', $event)"
                  class="gradientPicker_start_sliders"
                  style="width: 372px; margin-left: -0.4em; background: #fff; height: 17px; border: 1px solid #fff;cursor:pointer;"
                  title="单击添加触点"
                >
                  <div class="cp-default gradientPicker_slider_info" style="display: none;"></div>

                  <div
                    :style="{left:calPosition(item.offset), borderColor:item === currentStop ? '#000':'#d0d0d0', boxShadow:item === currentStop ? '0 0 2px #000':'none'}"
                    @click.stop
                    @dblclick="showColorSelect"
                    @mousedown.stop="currentEditorAndMove(item,$event)"
                    class="gradientPicker_slider"
                    style="position: absolute;cursor:default;transition:border 0.3s,box-shadow 0.3s;left: 0px;top:55px;width: 10px;height: 10px;background: red;border: 1px solid #d0d0d0;display: inline-block;"
                    v-for="item in colorStopList"
                  >
                    <i
                      :style="{color: item === currentStop ? '#000':'#d0d0d0' }"
                      class="iconfont icon-zhcc_xiangshangjiantou"
                      style="position: absolute;left: -3px;top:-12px;"
                    ></i>
                    <div
                      :style="{background:item.color}"
                      style="position:absolute;width:100%;height:100%;z-index:2;"
                    ></div>
                    <div
                      style="position:absolute;width:100%;height:100%;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAGUlEQVQYV2M4gwH+YwCGIasIUwhT25BVBADtzYNYrHvv4gAAAABJRU5ErkJggg==)"
                    ></div>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="16">
              <el-row>
                <el-col :span="4">
                  <span style="line-height:28px;">颜色</span>
                </el-col>
                <el-col :span="20">
                  <input class="gradientPicker-color-selector" style="display: none;" type="text">
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="4">
                  <span style="line-height:38px;">位置</span>
                </el-col>
                <el-col :span="20">
                  <el-slider
                    :format-tooltip="formatPositionTooltip"
                    :max="1"
                    :min="0"
                    :step="0.01"
                    @change="changeOffset"
                    id="picker"
                    input-size="mini"
                    show-input
                    v-model="currentStop.offset"
                  ></el-slider>
                </el-col>
              </el-row>

              <el-row v-if="gradientType=='radial'">
                <el-col :span="4">
                  <span style="line-height:38px;">X轴</span>
                </el-col>
                <el-col :span="20">
                  <el-slider
                    :format-tooltip="formatPositionTooltip"
                    :max="1"
                    :min="0"
                    :step="0.01"
                    @change="excx"
                    id="picker"
                    input-size="mini"
                    show-input
                    v-model="cx"
                  ></el-slider>
                </el-col>
              </el-row>

              <el-row v-if="gradientType=='radial'">
                <el-col :span="4">
                  <span style="line-height:38px;">Y轴</span>
                </el-col>
                <el-col :span="20">
                  <el-slider
                    :format-tooltip="formatPositionTooltip"
                    :max="1"
                    :min="0"
                    :step="0.01"
                    @change="excy"
                    id="picker"
                    input-size="mini"
                    show-input
                    v-model="cy"
                  ></el-slider>
                </el-col>
              </el-row>

              <el-row v-if="gradientType=='linear'">
                <el-col :span="4">
                  <span style="line-height:38px;">角度</span>
                </el-col>
                <el-col :span="20">
                  <el-slider
                    :format-tooltip="formatAngleTooltip"
                    :max="360"
                    :min="0"
                    @change="exangle"
                    id="picker"
                    input-size="mini"
                    show-input
                    v-model="angle"
                  ></el-slider>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row>
                <el-col :span="24">
                  <div
                    style="position:relative;margin-left:30px;height:70px; width:70px;border:1px solid #e5e5e5;border-radius:4px;"
                  >
                    <div
                      class="gradientPicker_preview"
                      style="position:absolute;height:60px; width:60px;top:5px;left:5px;border-radius:4px;z-index:2;"
                    ></div>
                    <div
                      style="position:absolute;height:60px; width:60px;top:5px;left:5px;border-radius:4px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAGUlEQVQYV2M4gwH+YwCGIasIUwhT25BVBADtzYNYrHvv4gAAAABJRU5ErkJggg==)"
                    ></div>
                  </div>
                </el-col>
              </el-row>
              <div style="margin-top:25px;"></div>
              <el-row>
                <el-col :span="2">
                  <div>&nbsp;</div>
                </el-col>
                <el-col :span="22">
                  <el-button
                    @click="closePanel"
                    size="mini"
                    style="padding-left:6px;padding-right:6px;"
                  >取消</el-button>
                  <el-button @click="confirm" size="mini" type="primary">确认</el-button>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
//颜色选择组件
import $ from 'jquery'
export default {
  name: 'GradientPicker',
  props: ['value', 'size', 'localStoragekey', 'label', 'tooltip'],
  data: function() {
    return {
      colorType: '1',
      reverse: false,
      gradientType: 'linear',
      angle: 90,
      cx: 0.5,
      cy: 0.5,
      cr: 0.5,
      colorStopList: [],
      currentStop: {},

      rand_RGB: [],
      rand_pos: [],

      moveStopClick: false,
      isShowPanel: false,
      showPanelLeft: '0px',
      showPanelTop: '0px',
      singleColor: '',

      selectedColorList: [],

      defaultColorList: [
        {
          colorStops: [
            { color: 'rgb(0, 0, 0)', offset: 0 },
            { color: 'rgb(255, 255, 255)', offset: 1 }
          ],
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 1,
          angle: 315,
          background: [
            '-webkit-linear-gradient(315deg , rgb(0, 0, 0) , rgb(255, 255, 255) 100%)',
            '-moz-linear-gradient(315deg , rgb(0, 0, 0) , rgb(255, 255, 255) 100%)',
            '-ms-linear-gradient(315deg , rgb(0, 0, 0) , rgb(255, 255, 255) 100%)',
            '-o-linear-gradient(315deg , rgb(0, 0, 0) , rgb(255, 255, 255) 100%)',
            'linear-gradient(-225deg , rgb(0, 0, 0) , rgb(255, 255, 255) 100%)'
          ]
        },
        {
          colorStops: [
            { color: 'rgb(0, 0, 0)', offset: 0 },
            { color: 'rgba(255, 255, 255, 0)', offset: 1 }
          ],
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 1,
          angle: 315,
          background: [
            '-webkit-linear-gradient(315deg , rgb(0, 0, 0) , rgba(255, 255, 255, 0) 100%)',
            '-moz-linear-gradient(315deg , rgb(0, 0, 0) , rgba(255, 255, 255, 0) 100%)',
            '-ms-linear-gradient(315deg , rgb(0, 0, 0) , rgba(255, 255, 255, 0) 100%)',
            '-o-linear-gradient(315deg , rgb(0, 0, 0) , rgba(255, 255, 255, 0) 100%)',
            'linear-gradient(-225deg , rgb(0, 0, 0) , rgba(255, 255, 255, 0) 100%)'
          ]
        },
        {
          colorStops: [
            { color: 'rgb(253, 235, 113)', offset: 0 },
            { color: 'rgb(248, 216, 0)', offset: 1 }
          ],
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 1,
          angle: 315,
          background: [
            '-webkit-linear-gradient(315deg , rgb(253, 235, 113) , rgb(248, 216, 0) 100%)',
            '-moz-linear-gradient(315deg , rgb(253, 235, 113) , rgb(248, 216, 0) 100%)',
            '-ms-linear-gradient(315deg , rgb(253, 235, 113) , rgb(248, 216, 0) 100%)',
            '-o-linear-gradient(315deg , rgb(253, 235, 113) , rgb(248, 216, 0) 100%)',
            'linear-gradient(-225deg , rgb(253, 235, 113) , rgb(248, 216, 0) 100%)'
          ]
        },
        {
          colorStops: [
            { color: 'rgb(171, 220, 255)', offset: 0 },
            { color: 'rgb(3, 150, 255)', offset: 1 }
          ],
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 1,
          angle: 315,
          background: [
            '-webkit-linear-gradient(315deg , rgb(171, 220, 255) , rgb(3, 150, 255) 100%)',
            '-moz-linear-gradient(315deg , rgb(171, 220, 255) , rgb(3, 150, 255) 100%)',
            '-ms-linear-gradient(315deg , rgb(171, 220, 255) , rgb(3, 150, 255) 100%)',
            '-o-linear-gradient(315deg , rgb(171, 220, 255) , rgb(3, 150, 255) 100%)',
            'linear-gradient(-225deg , rgb(171, 220, 255) , rgb(3, 150, 255) 100%)'
          ]
        },
        {
          colorStops: [
            { color: 'rgb(254, 182, 146)', offset: 0 },
            { color: 'rgb(234, 84, 85)', offset: 1 }
          ],
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 1,
          angle: 315,
          background: [
            '-webkit-linear-gradient(315deg , rgb(254, 182, 146) , rgb(234, 84, 85) 100%)',
            '-moz-linear-gradient(315deg , rgb(254, 182, 146) , rgb(234, 84, 85) 100%)',
            '-ms-linear-gradient(315deg , rgb(254, 182, 146) , rgb(234, 84, 85) 100%)',
            '-o-linear-gradient(315deg , rgb(254, 182, 146) , rgb(234, 84, 85) 100%)',
            'linear-gradient(-225deg , rgb(254, 182, 146) , rgb(234, 84, 85) 100%)'
          ]
        },
        {
          colorStops: [
            { color: 'rgb(206, 159, 252)', offset: 0 },
            { color: 'rgb(115, 103, 240)', offset: 1 }
          ],
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 1,
          angle: 315,
          background: [
            '-webkit-linear-gradient(315deg , rgb(206, 159, 252) , rgb(115, 103, 240) 100%)',
            '-moz-linear-gradient(315deg , rgb(206, 159, 252) , rgb(115, 103, 240) 100%)',
            '-ms-linear-gradient(315deg , rgb(206, 159, 252) , rgb(115, 103, 240) 100%)',
            '-o-linear-gradient(315deg , rgb(206, 159, 252) , rgb(115, 103, 240) 100%)',
            'linear-gradient(-225deg , rgb(206, 159, 252) , rgb(115, 103, 240) 100%)'
          ]
        },
        {
          colorStops: [
            { color: 'rgb(144, 247, 236)', offset: 0 },
            { color: 'rgb(50, 204, 188)', offset: 1 }
          ],
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 1,
          angle: 315,
          background: [
            '-webkit-linear-gradient(315deg , rgb(144, 247, 236) , rgb(50, 204, 188) 100%)',
            '-moz-linear-gradient(315deg , rgb(144, 247, 236) , rgb(50, 204, 188) 100%)',
            '-ms-linear-gradient(315deg , rgb(144, 247, 236) , rgb(50, 204, 188) 100%)',
            '-o-linear-gradient(315deg , rgb(144, 247, 236) , rgb(50, 204, 188) 100%)',
            'linear-gradient(-225deg , rgb(144, 247, 236) , rgb(50, 204, 188) 100%)'
          ]
        },
        {
          colorStops: [
            { color: 'rgb(255, 246, 183)', offset: 0 },
            { color: 'rgb(246, 65, 108)', offset: 1 }
          ],
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 1,
          angle: 315,
          background: [
            '-webkit-linear-gradient(315deg , rgb(255, 246, 183) , rgb(246, 65, 108) 100%)',
            '-moz-linear-gradient(315deg , rgb(255, 246, 183) , rgb(246, 65, 108) 100%)',
            '-ms-linear-gradient(315deg , rgb(255, 246, 183) , rgb(246, 65, 108) 100%)',
            '-o-linear-gradient(315deg , rgb(255, 246, 183) , rgb(246, 65, 108) 100%)',
            'linear-gradient(-225deg , rgb(255, 246, 183) , rgb(246, 65, 108) 100%)'
          ]
        },
        {
          colorStops: [
            { color: 'rgb(247, 97, 161)', offset: 0 },
            { color: 'rgb(140, 27, 171)', offset: 1 }
          ],
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 1,
          angle: 315,
          background: [
            '-webkit-linear-gradient(315deg , rgb(247, 97, 161) , rgb(140, 27, 171) 100%)',
            '-moz-linear-gradient(315deg , rgb(247, 97, 161) , rgb(140, 27, 171) 100%)',
            '-ms-linear-gradient(315deg , rgb(247, 97, 161) , rgb(140, 27, 171) 100%)',
            '-o-linear-gradient(315deg , rgb(247, 97, 161) , rgb(140, 27, 171) 100%)',
            'linear-gradient(-225deg , rgb(247, 97, 161) , rgb(140, 27, 171) 100%)'
          ]
        },
        {
          colorStops: [
            { color: 'rgb(240, 95, 87)', offset: 0 },
            { color: 'rgb(54, 9, 64)', offset: 1 }
          ],
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 1,
          angle: 315,
          background: [
            '-webkit-linear-gradient(315deg , rgb(240, 95, 87) , rgb(54, 9, 64) 100%)',
            '-moz-linear-gradient(315deg , rgb(240, 95, 87) , rgb(54, 9, 64) 100%)',
            '-ms-linear-gradient(315deg , rgb(240, 95, 87) , rgb(54, 9, 64) 100%)',
            '-o-linear-gradient(315deg , rgb(240, 95, 87) , rgb(54, 9, 64) 100%)',
            'linear-gradient(-225deg , rgb(240, 95, 87) , rgb(54, 9, 64) 100%)'
          ]
        },
        {
          colorStops: [
            { color: 'rgb(255, 111, 216)', offset: 0 },
            { color: 'rgb(56, 19, 194)', offset: 1 }
          ],
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 1,
          angle: 315,
          background: [
            '-webkit-linear-gradient(315deg , rgb(255, 111, 216) , rgb(56, 19, 194) 100%)',
            '-moz-linear-gradient(315deg , rgb(255, 111, 216) , rgb(56, 19, 194) 100%)',
            '-ms-linear-gradient(315deg , rgb(255, 111, 216) , rgb(56, 19, 194) 100%)',
            '-o-linear-gradient(315deg , rgb(255, 111, 216) , rgb(56, 19, 194) 100%)',
            'linear-gradient(-225deg , rgb(255, 111, 216) , rgb(56, 19, 194) 100%)'
          ]
        },
        {
          colorStops: [
            { color: 'rgb(129, 255, 239)', offset: 0 },
            { color: 'rgb(240, 103, 180)', offset: 1 }
          ],
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 1,
          angle: 315,
          background: [
            '-webkit-linear-gradient(315deg , rgb(129, 255, 239) , rgb(240, 103, 180) 100%)',
            '-moz-linear-gradient(315deg , rgb(129, 255, 239) , rgb(240, 103, 180) 100%)',
            '-ms-linear-gradient(315deg , rgb(129, 255, 239) , rgb(240, 103, 180) 100%)',
            '-o-linear-gradient(315deg , rgb(129, 255, 239) , rgb(240, 103, 180) 100%)',
            'linear-gradient(-225deg , rgb(129, 255, 239) , rgb(240, 103, 180) 100%)'
          ]
        },
        {
          colorStops: [
            { color: 'rgb(255, 168, 168)', offset: 0 },
            { color: 'rgb(252, 255, 0)', offset: 1 }
          ],
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 1,
          angle: 315,
          background: [
            '-webkit-linear-gradient(315deg , rgb(255, 168, 168) , rgb(252, 255, 0) 100%)',
            '-moz-linear-gradient(315deg , rgb(255, 168, 168) , rgb(252, 255, 0) 100%)',
            '-ms-linear-gradient(315deg , rgb(255, 168, 168) , rgb(252, 255, 0) 100%)',
            '-o-linear-gradient(315deg , rgb(255, 168, 168) , rgb(252, 255, 0) 100%)',
            'linear-gradient(-225deg , rgb(255, 168, 168) , rgb(252, 255, 0) 100%)'
          ]
        },
        {
          colorStops: [
            { color: 'rgb(255, 207, 113)', offset: 0 },
            { color: 'rgb(35, 118, 221)', offset: 1 }
          ],
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 1,
          angle: 315,
          background: [
            '-webkit-linear-gradient(315deg , rgb(255, 207, 113) , rgb(35, 118, 221) 100%)',
            '-moz-linear-gradient(315deg , rgb(255, 207, 113) , rgb(35, 118, 221) 100%)',
            '-ms-linear-gradient(315deg , rgb(255, 207, 113) , rgb(35, 118, 221) 100%)',
            '-o-linear-gradient(315deg , rgb(255, 207, 113) , rgb(35, 118, 221) 100%)',
            'linear-gradient(-225deg , rgb(255, 207, 113) , rgb(35, 118, 221) 100%)'
          ]
        },
        {
          colorStops: [
            { color: 'rgb(238, 154, 229)', offset: 0 },
            { color: 'rgb(89, 97, 249)', offset: 1 }
          ],
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 1,
          angle: 315,
          background: [
            '-webkit-linear-gradient(315deg , rgb(238, 154, 229) , rgb(89, 97, 249) 100%)',
            '-moz-linear-gradient(315deg , rgb(238, 154, 229) , rgb(89, 97, 249) 100%)',
            '-ms-linear-gradient(315deg , rgb(238, 154, 229) , rgb(89, 97, 249) 100%)',
            '-o-linear-gradient(315deg , rgb(238, 154, 229) , rgb(89, 97, 249) 100%)',
            'linear-gradient(-225deg , rgb(238, 154, 229) , rgb(89, 97, 249) 100%)'
          ]
        }
      ]

      // panelStyle:{},
      // previewStyle:{}
    }
  },
  mounted: function() {
    // console.dir(this.label)
    var el = $(this.$el)
    var _this = this
    var spectOption = {
      showPalette: true,
      allowEmpty: true,
      showAlpha: true,
      // preferredFormat: "hex",
      clickoutFiresChange: false,
      showInitial: true,
      showInput: true,
      flat: true,
      hideAfterPaletteSelect: true,
      showSelectionPalette: true,
      maxPaletteSize: 8,
      maxSelectionSize: 8,
      cancelText: '取消',
      chooseText: '确定颜色',
      togglePaletteMoreText: '自定义',
      togglePaletteLessText: '收起',
      togglePaletteOnly: false,
      clearText: '清除颜色选择',
      color: '#000',
      preferredFormat: 'rgb',
      noColorSelectedText: '没有颜色被选择',
      localStorageKey: 'colorGradientPicker',
      palette: [
        ['#000', '#444', '#666', '#999', '#ccc', '#eee', '#f3f3f3', '#fff'],
        ['#f00', '#f90', '#ff0', '#0f0', '#0ff', '#00f', '#90f', '#f0f'],
        [
          '#f4cccc',
          '#fce5cd',
          '#fff2cc',
          '#d9ead3',
          '#d0e0e3',
          '#cfe2f3',
          '#d9d2e9',
          '#ead1dc'
        ],
        [
          '#ea9999',
          '#f9cb9c',
          '#ffe599',
          '#b6d7a8',
          '#a2c4c9',
          '#9fc5e8',
          '#b4a7d6',
          '#d5a6bd'
        ],
        [
          '#e06666',
          '#f6b26b',
          '#ffd966',
          '#93c47d',
          '#76a5af',
          '#6fa8dc',
          '#8e7cc3',
          '#c27ba0'
        ],
        [
          '#c00',
          '#e69138',
          '#f1c232',
          '#6aa84f',
          '#45818e',
          '#3d85c6',
          '#674ea7',
          '#a64d79'
        ],
        [
          '#900',
          '#b45f06',
          '#bf9000',
          '#38761d',
          '#134f5c',
          '#0b5394',
          '#351c75',
          '#741b47'
        ],
        [
          '#600',
          '#783f04',
          '#7f6000',
          '#274e13',
          '#0c343d',
          '#073763',
          '#20124d',
          '#4c1130'
        ]
      ],
      change: function(color) {
        var $input = $(this)
        if (color != null) {
          color = color.toRgbString()
        }
        $input.val(color)
        _this.singleColor = color
        _this.confirm()
      }
    }
    el.find('.gradientPicker-color-flat').spectrum(spectOption)
    var newOption = $.extend(true, {}, spectOption)
    newOption.flat = false
    newOption.change = function(color) {
      var $input = $(this)
      if (color != null) {
        color = color.toRgbString()
      }
      $input.val(color)
      _this.currentStop.color = color
      _this.apply_style()
    }
    el.find('.gradientPicker-color-selector').spectrum(newOption)
    $('.sp-cancel').on('click', this.closePanel)
    var trigger = el.find('.gradientPicker_trigger')
    if (this.value instanceof Object) {
      trigger.css('background', this.getColorByBrowser(this.value))
    } else {
      trigger.css('background', this.value)
    }
  },
  computed: {
    iconSize: function() {
      if (this.size == 'medium') {
        return '36px'
      } else if (this.size == 'small') {
        return '32px'
      } else if (this.size == 'mini') {
        return '28px'
      } else {
        return '40px'
      }
    },
    comColorType: {
      get: function() {
        if (this.value instanceof Object) {
          this.colorType = '2'
          return '2'
        } else {
          this.colorType = '1'
          return '1'
        }
      },
      set: function(value) {
        this.colorType = value
      }
    },
    comSingleColor: {
      get: function() {
        if (this.value instanceof Object) {
          this.singleColor = null
          return null
        } else {
          this.singleColor = this.value
          $(this.$el)
            .find('.gradientPicker-color-flat')
            .spectrum('set', this.value)
          return []
        }
      },
      set: function(value) {
        this.singleColor = value
      }
    },
    comColorStopList: {
      get: function() {
        if (this.value instanceof Object) {
          this.colorStopList = this.value.colorStops
          return this.value.colorStops
        } else {
          this.colorStopList = []
          return []
        }
      },
      set: function(value) {
        this.colorStopList = value
      }
    },
    comGradientType: {
      get: function() {
        if (this.value instanceof Object) {
          this.gradientType = this.value.type
          return this.value.type
        } else {
          this.gradientType = 'linear'
          return 'linear'
        }
      },
      set: function(value) {
        this.gradientType = value
      }
    },
    comCx: {
      get: function() {
        if (this.value instanceof Object) {
          this.cx = this.value.cx
          return this.value.cx
        } else {
          this.cx = 0.5
          return 0.5
        }
      },
      set: function(value) {
        this.cx = value
      }
    },
    comCy: {
      get: function() {
        if (this.value instanceof Object) {
          this.cy = this.value.cy
          return this.value.cy
        } else {
          this.cy = 0.5
          return 0.5
        }
      },
      set: function(value) {
        this.cy = value
      }
    },
    chart_pro: function() {
      return this.$store.state.chartSetting.chartList[
        this.$store.state.chartSetting.chartCurrent
      ].chartAllType.split('|')[0]
    },
    chart_style() {
      return this.$store.state.chartSetting.chartList[
        this.$store.state.chartSetting.chartCurrent
      ].chartAllType.split('|')[2]
    },
    disable() {
      if (this.label) {
        return true
      } else if (
        this.chart_pro == 'echarts' &&
        this.chart_style == 'bar3DPunchCard'
      ) {
        return true
      } else if (!this.label) {
        return false
      }
    }
  },
  watch: {
    gradientType: function(newV, oldV) {
      this.apply_style()
    },
    angle: function(newV, oldV) {
      this.apply_style()
    },
    cx: function(newV, oldV) {
      this.apply_style()
    },
    cy: function(newV, oldV) {
      this.apply_style()
    },
    value: function(newV, oldV) {
      var trigger = $(this.$el).find('.gradientPicker_trigger')
      if (newV == null) {
        trigger.css('background', 'transparent')
      } else {
        if (newV instanceof Object) {
          trigger.css('background', this.getColorByBrowser(newV))
        } else {
          trigger.css('background', newV)
        }
      }
    }
  },
  methods: {
    hideTooltip: function() {
      $('.el-tooltip__popper').hide()
    },
    webBrowserType: function() {
      var explorer = navigator.userAgent
      var type = 'Chrome'
      //ie
      if (explorer.indexOf('MSIE') >= 0) {
        type = 'ie'
      }
      //firefox
      else if (explorer.indexOf('Firefox') >= 0) {
        type = 'Firefox'
      }
      //Chrome
      else if (explorer.indexOf('Chrome') >= 0) {
        type = 'Chrome'
      }
      //Opera
      else if (explorer.indexOf('Opera') >= 0) {
        type = 'Opera'
      }
      //Safari
      else if (explorer.indexOf('Safari') >= 0) {
        type = 'Safari'
      }
      //Netscape
      else if (explorer.indexOf('Netscape') >= 0) {
        type = 'Netscape'
      }

      return type
    },
    getColorByBrowser: function(item) {
      var bg = item.background
      var type = this.webBrowserType()
      var color = bg[0]
      if (type == 'MSIE') {
        color = bg[2]
      } else if (type == 'Firefox') {
        color = bg[1]
      } else if (type == 'Opera') {
        color = bg[3]
      } else if (type == 'Chrome' || type == 'Safari') {
        color = bg[0]
      } else {
        color = bg[4]
      }

      return color
    },
    setdefaultColor: function(item) {
      this.colorStopList = $.extend(true, [], item.colorStops)
      this.gradientType = 'linear'
      this.currentStop = this.colorStopList[0]
      this.angle = 315

      this.apply_style()
      var $selector = $(this.$el).find('.gradientPicker-color-selector')
      $selector.spectrum('set', this.currentStop.color)
    },
    reverseOp: function() {
      if (this.colorStopList == null || this.colorStopList.length == 0) {
        return
      }
      for (var i = 0; i < this.colorStopList.length; i++) {
        var item = this.colorStopList[i]
        item.offset = Math.round((1 - item.offset) * 1000) / 1000
      }
      this.apply_style()
    },
    showPanel: function(e) {
      var _this = this
      if (this.isShowPanel) {
        this.isShowPanel = false
        return
      }
      this.isShowPanel = true
      // 当前的取色器显示,其他的隐藏
      var el = $(e.target)
      var els = $('#luckysheet-data-visualization .main')
      els.css('display', 'none')
      el.css('display', 'block')

      var $grad = $(this.$el).find('.gradientPicker')
      var gradOffset = $grad.offset()
      var panelWidth = 380 + 14,
        panelHeight = 310 + 14
      var iconWH = parseInt(this.iconSize)

      var winW = $(window).outerWidth(),
        winH = $(window).outerHeight()
      // this.showPanelLeft =
      // this.showPanelTop =
      var exceed = false
      if (gradOffset.top + iconWH + panelHeight > winH) {
        this.showPanelTop = gradOffset.top - panelHeight
        if (gradOffset.top - panelHeight < 0) {
          this.showPanelTop = 0
          exceed = true
        }
      } else {
        this.showPanelTop = gradOffset.top + iconWH
      }

      if (gradOffset.left + panelWidth > winW) {
        var ih = iconWH
        if (exceed) {
          ih = 0
        }
        this.showPanelLeft = gradOffset.left - panelWidth + ih
      } else {
        this.showPanelLeft = gradOffset.left
      }

      this.showPanelLeft += 'px'
      this.showPanelTop += 'px'

      var _this = this

      $(document).on('mousedown.gradientPicker.showPanel', function(e) {
        var target = e.target
        if (
          $(target).closest('.gradientPickerC').length > 0 ||
          $(target).closest('.sp-container').length > 0
        ) {
          return
        }
        _this.closePanel()
      })

      $(_this.$el)
        .on('keydown.gradientPicker.showPanel', function(e) {
          var target = e.target
          if ($(target).closest('.gradientPickerC').length == 0) {
            return
          }

          if (e.keyCode == 46 && _this.currentStop != null) {
            _this.deleteStop()
            e.preventDefault()
            e.stopPropagation()
          }
        })
        .attr('tabindex', 0)
        .focus()

      this.reverse = false

      if (this.value != null && this.value instanceof Object) {
        // highcharts格式记住之前配置
        if (this.value.stops) {
          if (this.value.stops != null) {
            var arr = $.extend(true, [], this.value.stops)
            this.colorStopList = []
            for (var i = 0; i < arr.length; i++) {
              this.colorStopList.push({
                offset: arr[i][0],
                color: arr[i][1]
              })
            }
          } else {
            this.colorStopList = []
          }

          if (this.colorStopList.length > 0) {
            this.currentStop = this.colorStopList[0]
          } else {
            this.currentStop = null
          }

          this.colorType = '2'

          if (this.value.linearGradient) {
            this.gradientType = 'linear'
          } else {
            this.gradientType = 'radial'
          }

          if (this.gradientType == 'radial') {
            if (this.value.radialGradient.cx != null) {
              this.cx = this.value.radialGradient.cx
            } else {
              this.cx = 0.5
            }

            if (this.value.radialGradient.cy != null) {
              this.cy = this.value.radialGradient.cy
            } else {
              this.cy = 0.5
            }
          } else {
            if (this.value.angle != null) {
              this.angle = this.value.angle
            } else {
              this.angle = 90
            }
          }
          this.singleColor = null
        } else {
          //echarts格式记住之前配置
          if (this.value.colorStops != null) {
            this.colorStopList = $.extend(true, [], this.value.colorStops)
          } else {
            this.colorStopList = []
          }

          if (this.colorStopList.length > 0) {
            this.currentStop = this.colorStopList[0]
          } else {
            this.currentStop = null
          }

          this.colorType = '2'

          if (this.value.type != null) {
            this.gradientType = this.value.type
          } else {
            this.gradientType = 'linear'
          }

          if (this.gradientType == 'radial') {
            if (this.value.cx != null) {
              this.cx = this.value.cx
            } else {
              this.cx = 0.5
            }

            if (this.value.cy != null) {
              this.cy = this.value.cy
            } else {
              this.cy = 0.5
            }
          } else {
            if (this.value.angle != null) {
              this.angle = this.value.angle
            } else {
              this.angle = 90
            }
          }
          this.singleColor = null
        }
      } else {
        this.colorType = '1'

        if (this.value != null) {
          this.singleColor = this.value
        } else {
          this.singleColor = null
        }

        this.colorStopList = []
        this.gradientType = 'linear'
        this.currentStop = null
        this.cx = 0.5
        this.cy = 0.5
        this.angle = 90
      }

      setTimeout(function() {
        $(_this.$el)
          .find('.gradientPicker-color-flat')
          .spectrum('set', _this.singleColor)
      })

      this.apply_style()
      var $selector = $(this.$el).find('.gradientPicker-color-selector')
      if (this.currentStop != null && this.currentStop.color != null) {
        $selector.spectrum('set', this.currentStop.color)
      } else {
        $selector.spectrum('set', null)
      }

      this.selectedColorList = this.getLocalStorage()
    },
    closePanel: function() {
      $(this.$el).off('.gradientPicker.showPanel')
      $(document).off('.gradientPicker.showPanel')
      this.isShowPanel = false
    },
    confirm: function() {
      var trigger = $(this.$el).find('.gradientPicker_trigger')
      var gradien = this.get_style_value()
      var linearGradient = '',
        radialGradient = ''

      if (this.colorType == '2') {
        if (this.colorStopList.length == 0) {
          this.$emit('input', null)
          this.$emit('change', null)
        } else {
          if (gradien instanceof Array) {
            linearGradient = [
              '-webkit-linear-gradient(' + gradien[0] + ')',
              '-moz-linear-gradient(' + gradien[0] + ')',
              '-ms-linear-gradient(' + gradien[0] + ')',
              '-o-linear-gradient(' + gradien[0] + ')',
              'linear-gradient(' + gradien[3] + ')'
            ]

            radialGradient = [
              '-webkit-radial-gradient(' + gradien[1] + ')',
              '-moz-radial-gradient(' + gradien[1] + ')',
              '-ms-radial-gradient(' + gradien[1] + ')',
              '-o-radial-gradient(' + gradien[1] + ')',
              'radial-gradient(' + gradien[1] + ')'
            ]

            var len = linearGradient.length
            while (len > 0) {
              len--
              // $panel.css("background", panelGradient[len]);
              if (this.gradientType == 'radial') {
                trigger.css('background', radialGradient[len])
              } else {
                trigger.css('background', linearGradient[len])
              }
            }

            var option = {}
            option.colorStops = $.extend(true, [], this.colorStopList)

            if (this.gradientType == 'radial') {
              option.type = 'radial'
              option.cx = this.cx
              option.cy = this.cy
              option.r = 0.5

              option.background = radialGradient
            } else {
              option.type = 'linear'
              // option.x = 0;
              // option.y = 0;

              var an = this.angle
              if (an == 360) {
                an = 0
              }
              if (an >= 0 && an < 90) {
                option.x = 0
                option.y = 1
                if (an <= 45) {
                  option.x2 = 1
                  option.y2 = Math.abs(Math.tan((an - 45) * (Math.PI / 180)))
                } else {
                  option.x2 = Math.tan((an - 45) * (Math.PI / 180))
                  option.y2 = 0
                }
              } else if (an >= 90 && an < 180) {
                option.x = 1
                option.y = 1
                if (an <= 135) {
                  option.x2 = Math.abs(
                    Math.tan((an - 90 - 45) * (Math.PI / 180))
                  )
                  option.y2 = 0
                } else {
                  option.x2 = 0
                  option.y2 = Math.tan((an - 90 - 45) * (Math.PI / 180))
                }
              } else if (an >= 180 && an < 270) {
                option.x = 1
                option.y = 0
                if (an <= 225) {
                  option.x2 = 0
                  option.y2 = Math.abs(Math.tan((an - 180) * (Math.PI / 180)))
                } else {
                  option.x2 = Math.abs(
                    1 / Math.tan((an - 180 + 45) * (Math.PI / 180))
                  )
                  option.y2 = 1
                }
              } else if (an >= 270 && an < 360) {
                option.x = 0
                option.y = 0
                if (an <= 315) {
                  option.x2 = Math.abs(Math.tan((an - 270) * (Math.PI / 180)))
                  option.y2 = 1
                } else {
                  option.x2 = 1
                  option.y2 = Math.abs(
                    Math.tan((an - 270 - 90) * (Math.PI / 180))
                  )
                }
              }

              option.x2 = Math.round(option.x2 * 100) / 100
              option.y2 = Math.round(option.y2 * 100) / 100

              option.angle = this.angle

              option.background = linearGradient
            }

            this.$emit('input', option)
            this.$emit('change', option)

            this.setLocalStorage(option)
          } else {
            this.$emit('input', gradien)
            this.$emit('change', gradien)
          }
        }
      } else {
        this.$emit('input', this.singleColor)
        this.$emit('change', this.singleColor)
      }

      this.closePanel()
    },
    getlocalStoragekey: function() {
      var key = this.localStoragekey
      if (key == null) {
        key = 'gradientPicker_selectedColorList'
      }
      return key
    },
    setLocalStorage: function(item) {
      var key = this.getlocalStoragekey()
      if (!window.localStorage) {
        return
      }

      var storage = window.localStorage
      var list = storage[key]
      var colorlist = null
      if (list == null || list.length == 0) {
        colorlist = []
      } else {
        colorlist = JSON.parse(list)
      }

      for (var i = 0; i < colorlist.length; i++) {
        var exitsItem = colorlist[i]
        if (
          JSON.stringify(exitsItem.background[0]) ==
          JSON.stringify(item.background[0])
        ) {
          return
        }
      }

      while (colorlist.length >= 5) {
        colorlist.pop()
      }
      colorlist.unshift(item)

      storage[key] = JSON.stringify(colorlist)
    },
    getLocalStorage: function() {
      var key = this.getlocalStoragekey()
      if (!window.localStorage) {
        return []
      }

      var storage = window.localStorage
      var list = storage[key]
      var colorlist = null
      if (list == null || list.length == 0) {
        colorlist = []
      } else {
        colorlist = JSON.parse(list)
      }
      return colorlist
    },
    formatAngleTooltip: function(value) {
      return value + '°'
    },
    formatPositionTooltip: function(value) {
      return Math.round(value * 100) + '%'
    },
    fixE: function(e) {
      if (typeof e == 'undefined') e = window.event
      if (typeof e.layerX == 'undefined') e.layerX = e.offsetX
      if (typeof e.layerY == 'undefined') e.layerY = e.offsetY
      return e
    },
    get_random_position: function() {
      var pos

      do {
        pos = parseInt(Math.random() * 100) / 100
      } while (this.rand_pos.indexOf(pos) > -1)

      this.rand_pos.push(pos)
      return pos
    },
    get_random_rgb: function() {
      var R, G, B, color

      do {
        R = parseInt(Math.random() * 255)
        G = parseInt(Math.random() * 255)
        B = parseInt(Math.random() * 255)

        color = 'rgb(' + R + ', ' + G + ', ' + B + ')'
      } while (this.rand_RGB.indexOf(color) > -1)

      this.rand_RGB.push(color)
      return color
    },
    getPixelColor: function(canvas, x, y) {
      var thisContext = canvas.getContext('2d')
      var imageData = thisContext.getImageData(x, y, 1, 1)
      // 获取该点像素数据
      var pixel = imageData.data
      var r = pixel[0]
      var g = pixel[1]
      var b = pixel[2]
      var a = pixel[3] / 255
      a = Math.round(a * 100) / 100
      var rHex = r.toString(16)
      r < 16 && (rHex = '0' + rHex)
      var gHex = g.toString(16)
      g < 16 && (gHex = '0' + gHex)
      var bHex = b.toString(16)
      b < 16 && (bHex = '0' + bHex)
      var rgbaColor = 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')'
      var rgbColor = 'rgb(' + r + ',' + g + ',' + b + ')'
      var hexColor = '#' + rHex + gHex + bHex
      return {
        rgba: rgbaColor,
        rgb: rgbColor,
        hex: hexColor,
        r: r,
        g: g,
        b: b,
        a: a
      }
    },
    clickChangeColor: function(e) {
      if (this.currentStop == null) {
        return
      }
      var panelOffset = $(this.$el)
        .find('.gradientPicker_panel')
        .offset()
      var x = Math.round((e.x - parseInt(panelOffset.left)) * 2)
      var y = Math.round((e.y - parseInt(panelOffset.top)) * 2)

      var panelCanvas = e.currentTarget

      var color = this.getPixelColor(panelCanvas, x, y).rgba

      if (color != 'rgba(0,0,0,0)') {
        this.currentStop.color = color
        this.apply_style()
        $(this.$el)
          .find('.gradientPicker-color-selector')
          .spectrum('set', color)
      }
    },
    deleteStop: function() {
      var cslen = this.colorStopList.length
      var current = this.currentStop
      if (cslen == 0) {
        return
      }

      for (var i = 0; i < this.colorStopList.length; i++) {
        var item = this.colorStopList[i]
        if (current == item) {
          this.colorStopList.splice(i, 1)
          break
        }
      }

      if (cslen > this.colorStopList.length) {
        this.currentStop = this.colorStopList[0]
        this.apply_style()
        $(this.$el)
          .find('.gradientPicker-color-selector')
          .spectrum('set', this.currentStop.color)
      }
    },
    addColorStop: function(color, e) {
      if (this.moveStopClick) {
        return
      }

      var item = {
        color: this.get_random_rgb(),
        offset: this.get_random_position()
      }
      if (!(color instanceof Object)) {
        e = this.fixE(e)
        item.offset =
          Math.round(
            ((e.x -
              parseInt(
                $(this.$el)
                  .find('.gradientPicker_panel')
                  .offset().left
              )) *
              1000) /
              360
          ) / 1000
      }
      this.colorStopList.push(item)
      this.currentStop = item
      $(this.$el)
        .find('.gradientPicker-color-selector')
        .spectrum('set', item.color)
      this.apply_style()
    },
    get_style_value: function() {
      var _this = this

      var len = _this.colorStopList.length
      var ret = null
      if (len === 1) {
        ret = this.colorStopList[0].color
      } else {
        var style_str = '',
          suffix = ''
        for (var i = 0; i < len; i++) {
          if (this.colorStopList[i].offset == '') {
            style_str += suffix + this.colorStopList[i].color
          } else {
            if (this.colorStopList[i].offset > 1) {
              this.colorStopList[i].offset = 1
            }
            style_str +=
              suffix +
              (this.colorStopList[i].color +
                ' ' +
                this.colorStopList[i].offset * 100 +
                '%')
          }
          suffix = ' , ' //add , from next iteration
        }

        ret = []
        //direction, [color stoppers],linear
        // if(this.angle>=0 && this.angle<90){
        // 	ret[0] = this.angle + "deg , " + style_str;
        // }
        // else if(this.angle>=90 && this.angle<180){
        // 	ret[0] = this.angle + 180 + "deg , " + style_str;
        // }
        // else if(this.angle>=180 && this.angle<270){
        // 	ret[0] = this.angle + "deg , " + style_str;
        // }
        // else if(this.angle>=270 && this.angle<=360){
        // 	ret[0] = this.angle + 180 + "deg , " + style_str;
        // }

        ret[0] = this.angle + 'deg , ' + style_str //add
        //position, type size, [color stoppers],radial
        ret[1] =
          this.cx * 100 +
          '% ' +
          this.cy * 100 +
          '% , closest-side ' +
          ' , ' +
          style_str
        ret[2] = '0deg , ' + style_str //add

        ret[3] = 90 - this.angle + 'deg , ' + style_str //add
      }

      return ret
    },
    apply_style: function() {
      var _this = this
      var linearGradient = '',
        radialGradient = '',
        panelGradient = ''

      var $panel = $(this.$el).find('.gradientPicker_panel')
      var panelCanvas = $panel
        .find('canvas')
        .get(0)
        .getContext('2d')

      var $preview = $(this.$el).find('.gradientPicker_preview')

      if (_this.colorStopList == null || _this.colorStopList.length == 0) {
        this.currentStop = {}
        panelCanvas.clearRect(0, 0, 720, 84)
        $preview.css('background', 'transparent')
        return
      }

      _this.colorStopList.sort(function(A, B) {
        if (A.offset > B.offset) return 1
        else return -1
      })

      var gradien = _this.get_style_value()

      if (gradien instanceof Array) {
        linearGradient = [
          '-webkit-linear-gradient(' + gradien[0] + ')',
          '-moz-linear-gradient(' + gradien[0] + ')',
          '-ms-linear-gradient(' + gradien[0] + ')',
          '-o-linear-gradient(' + gradien[0] + ')',
          'linear-gradient(' + gradien[3] + ')'
        ]

        radialGradient = [
          '-webkit-radial-gradient(' + gradien[1] + ')',
          '-moz-radial-gradient(' + gradien[1] + ')',
          '-ms-radial-gradient(' + gradien[1] + ')',
          '-o-radial-gradient(' + gradien[1] + ')',
          'radial-gradient(' + gradien[1] + ')'
        ]

        // panelGradient = [
        //     "-webkit-linear-gradient(" + gradien[2] + ")",
        //     "-moz-linear-gradient(" + gradien[2] + ")",
        //     "-ms-linear-gradient(" + gradien[2] + ")",
        //     "-o-linear-gradient(" + gradien[2] + ")",
        //     "linear-gradient(" + gradien[2] + ")"
        // ];

        var grad = panelCanvas.createLinearGradient(0, 0, 720, 0)

        for (var i = 0; i < this.colorStopList.length; i++) {
          var item = this.colorStopList[i]
          grad.addColorStop(item.offset, item.color)
        }
        panelCanvas.clearRect(0, 0, 720, 84)
        panelCanvas.fillStyle = grad
        panelCanvas.fillRect(0, 0, 720, 84)

        var len = linearGradient.length
        while (len > 0) {
          len--
          // $panel.css("background", panelGradient[len]);
          if (this.gradientType == 'radial') {
            $preview.css('background', radialGradient[len])
          } else {
            $preview.css('background', linearGradient[len])
          }
        }
      } else {
        //只有一个触点，为纯色
        // $panel.css("background", gradien);
        panelCanvas.clearRect(0, 0, 720, 84)
        panelCanvas.fillStyle = gradien
        panelCanvas.fillRect(0, 0, 720, 84)
        $preview.css('background', gradien)
      }
    },
    showColorSelect: function() {
      $(this.$el)
        .find('.gradientPicker-color-selector')
        .spectrum('show')
    },
    currentEditorAndMove: function(item, e) {
      this.currentStop = item

      $(this.$el)
        .find('.gradientPicker-color-selector')
        .spectrum('set', item.color)

      var obj = e.currentTarget

      var hmode = true,
        vmode = true

      var minX = 0,
        maxX = 360
      var minY = 55,
        maxY = 55

      var _this = this

      e = this.fixE(e)
      var y = parseInt(vmode ? obj.style.top : obj.style.bottom)
      var x = parseInt(hmode ? obj.style.left : obj.style.right)

      var lastMouseX = e.clientX
      var lastMouseY = e.clientY

      var removeMouseY = e.clientY

      var minMouseX, minMouseY, maxMouseY, maxMouseX

      if (hmode) {
        if (minX != null) minMouseX = e.clientX - x + minX
        if (maxX != null) maxMouseX = minMouseX + maxX - minX
      } else {
        if (minX != null) maxMouseX = -minX + e.clientX + x
        if (maxX != null) minMouseX = -maxX + e.clientX + x
      }

      if (vmode) {
        if (minY != null) minMouseY = e.clientY - y + minY
        if (maxY != null) maxMouseY = minMouseY + maxY - minY
      } else {
        if (minY != null) maxMouseY = -minY + e.clientY + y
        if (maxY != null) minMouseY = -maxY + e.clientY + y
      }

      this.moveStopClick = true

      $(document).on('mousemove.gradientPicker.drag', function(e) {
        e = _this.fixE(e)
        var o = obj

        var left = $(o).css('left')

        var color = $(o).css('backgroundColor')
        //var rgb = _this.get_rgb_obj(color);
        //gradx.cp.spectrum("set",rgb);

        var ey = e.clientY
        var ex = e.clientX
        var y = parseInt(vmode ? o.style.top : o.style.bottom)
        var x = parseInt(hmode ? o.style.left : o.style.right)
        var nx, ny

        if (minX != null)
          ex = hmode ? Math.max(ex, minMouseX) : Math.min(ex, maxMouseX)
        if (maxX != null)
          ex = hmode ? Math.min(ex, maxMouseX) : Math.max(ex, minMouseX)
        if (minY != null)
          ey = vmode ? Math.max(ey, minMouseY) : Math.min(ey, maxMouseY)
        if (maxY != null)
          ey = vmode ? Math.min(ey, maxMouseY) : Math.max(ey, minMouseY)

        nx = x + (ex - lastMouseX) * (hmode ? 1 : -1)
        ny = y + (ey - lastMouseY) * (vmode ? 1 : -1)

        _this.currentStop.offset += (ex - lastMouseX) / 360
        lastMouseX = ex
        lastMouseY = ey

        _this.apply_style()
      })

      $(document).on('mouseup.gradientPicker.drag', function(e) {
        $(document).off('.gradientPicker.drag')

        _this.currentStop.offset =
          Math.round(_this.currentStop.offset * 1000) / 1000

        setTimeout(function() {
          _this.moveStopClick = false
        }, 200)

        if (e.clientY - removeMouseY >= 15) {
          _this.deleteStop()
        }

        obj = null
      })
    },
    calPosition: function(offset) {
      return offset * 360 + 'px'
    },
    changeOffset: function(val) {
      if (val.toString().length > 4) {
        this.currentStop.offset = +val.toString().slice(0, 4)
      }
      this.apply_style()
    },
    excx(val) {
      if (val.toString().length > 4) {
        this.cx = +val.toString().slice(0, 4)
      }
    },
    excy(val) {
      if (val.toString().length > 4) {
        this.cy = +val.toString().slice(0, 4)
      }
    },
    exangle(val) {
      var str = val.toString()
      if (str.includes('.')) {
        var arr = str.split('.')
        if (arr[1].length > 2) {
          this.angle = +(arr[0] + '.' + arr[1].slice(0, 2))
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
