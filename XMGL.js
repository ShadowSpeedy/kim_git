
GetTree("", "", "", "");
/**搜索重置按钮**/
$(function () {
    $("#xmwjgl_xmgl_btn_reset").click(function () {
        //树取消选择
        var treeObj = $.fn.zTree.getZTreeObj("BLtree");
        treeObj.cancelSelectedNode();
        treeObj.expandAll(false);
        GetTree("", "", "", "");
    });
});

/****搜索按钮****/
$(function () {
    $("#xmwjgl_xmgl_btn_search").click(function () {
        GetTree($("#xmwjgl_xmgl_cjmc").val(), $("#xmwjgl_xmgl_id").val(), $("#xmwjgl_xmgl_pId").val(), $("#xmwjgl_xmgl_Level").val());
    });
});


/**初始化表格方法（项目数据）**/
function GetTree(Name, id, pId, Level) {
    $(function () {
        $.ajax({
            data: {
                Name: Name,
                id: id,
                pId: pId,
                Level: Level
            },
            type: "get",
            url: '/XMWJGL/ListGetTreeLayer1',
            success: function (data) {
                var Jsondata = eval('(' + data + ')');
                $("#xmwjgl_xmgl_tb").bootstrapTable('destroy').bootstrapTable({
                    //'destroy' 是必须要加的==作用是加载服务器数据，初始化表格的内容Destroy the bootstrap table.
                    data: Jsondata,
                    dataType: 'json',
                    method: 'get',//请求方式（*）    
                    toolbar: '#toolbar',//工具按钮用哪个容器    
                    striped: true,//是否显示行间隔色    
                    cache: false,//是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）    
                    pagination: true,//是否显示分页（*）    
                    sortable: true, //是否启用排序    
                    sortOrder: "asc",//排序方式    
                    pageNumber: 1, //初始化加载第一页，默认第一页    
                    pageSize: 20,//每页的记录行数（*）    
                    pageList: [20, 25, 50, 100],//可供选择的每页的行数（*）    
                    //search: false,//是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大    
                    strictSearch: true,
                    showColumns: false,//是否显示所有的列    
                    showRefresh: false,//是否显示刷新按钮    
                    minimumCountColumns: 1,//最少允许的列数    
                    clickToSelect: true,//是否启用点击选中行    
                    //height: 500,//行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度    
                    uniqueId: "id", //每一行的唯一标识，一般为主键列    
                    showToggle: true,     //是否显示详细视图和列表视图的切换按钮    
                    cardView: false,     //是否显示详细视图    
                    detailView: false,     //是否显示父子表
                    showHeader: true,
                    onLoadErrow: function () {
                        layer.msg("加载数据失败");
                    },
                    columns: [
                         {
                             field: 'id',
                             title: '层级ID',
                             visible: false
                         },
                        {
                            field: 'pId',
                            title: '父级ID',
                            visible: false
                        },
                        {
                            field: 'Name',
                            title: '名称'
                        },
                        {
                            field: 'Level',
                            title: '层级',
                            visible: false
                        }
                    ]
                });
            },
            error: function (data) {
                swal("操作提示", "数据加载出现问题", "warning");
            }
        });
    });
}



//新增按钮
$(function () {
    $("#xmwjgl_xmgl_btn_add").click(function () {
        $("#xmwjgl_xmgl_xmForm").css('display', '');
        $("#xmwjgl_xmgl_dwForm").css('display', '');
        $("#xmwjgl_xmgl_dlForm").css('display', '');
        $("#xmwjgl_xmgl_kzwForm").css('display', '');
        $("#xmwjgl_xmgl_zlxForm").css('display', '');
        $("#xmwjgl_xmgl_addparentName").css('display', '');
        $("#xmwjgl_xmgl_kzwzlxTable").css('display', '');
        $("#xmwjgl_xmgl_fksjForm").css('display', '');
        $("#xmwjgl_xmgl_addjd").attr("disabled", false);
        $("#xmwjgl_xmgl_jdForm").css('display', '');
        $("#xmwjgl_xmgl_jdForm label:last").css('display', '');
        $("#xmwjgl_xmgl_addjdsj").css("display", '');
        $("#xmwjgl_xmgl_addxmmc").val("");
        $("#xmwjgl_xmgl_jdForm").val("");
        var Nodes = GetPathNodes();
        if (Nodes == 0 || Nodes.length == 5) {
            swal("操作提示", "请选择一个有效节点进行操作", "warning");
        }
        else {
            var SelectedNode_Name = Nodes[Nodes.length - 1].name;
            var SelectedNode_id = Nodes[Nodes.length - 1].id;
            //alert(SelectedNode_Name + "|" + SelectedNode_id);
            $("#xmwjgl_xmgl_addparentName").val(SelectedNode_Name);
            $("#xmwjgl_xmgl_addparentId").val(SelectedNode_id);
            //alert($("#xmwjgl_xmgl_addparentName").val()+ "|" +  $("#xmwjgl_xmgl_addparentId").val());
            switch (Nodes.length) {
                case 1:
                    dw_add();
                    break;
                case 2:
                    dlxd_add();
                    break;
                case 3:
                    kzw_add();
                    break;
                case 4:
                    zlx_add();
                    break;
                default:
                    break;
            }
        }
    });
});


/****修改(项目、段落)****/
$(function () {
    $("#xmwjgl_xmgl_btn_edit").click(function () {
        $("#xmwjgl_xmgl_xmForm").css('display', '');
        $("#xmwjgl_xmgl_dwForm").css('display', '');
        $("#xmwjgl_xmgl_dlForm").css('display', '');
        $("#xmwjgl_xmgl_kzwForm").css('display', '');
        $("#xmwjgl_xmgl_zlxForm").css('display', '');
        $("#xmwjgl_xmgl_parentForm").css('display', '');
        $("#xmwjgl_xmgl_kzwzlxTable").css('display', '');
        $("#xmwjgl_xmgl_fksjForm").css('display', '');
        $("#xmwjgl_xmgl_addjd").attr("disabled", false).val("");
        $("#xmwjgl_xmgl_jdForm").css('display', '');
        $("#xmwjgl_xmgl_jdForm label:last").css('display', '');
        $("#xmwjgl_xmgl_addjdsj").css("display", '');
        $("#xmwjgl_xmgl_addxmmc").val("");
        $("#xmwjgl_xmgl_jdForm").val("");
        var NodePath = GetPathNodes();
        if (NodePath[NodePath.length - 1].level == 0) {
            $("#xmwjgl_xmgl_addxmmc").val(NodePath[0].name.split('-')[0]);
            DropList_fzr("xmwjgl_xmgl_addxmfzr", "xm");
            $("#xmwjgl_xmgl_addjd").val(NodePath[0].name.split('-')[1]);
            $("#xmwjgl_xmgl_addjd").attr("disabled", true);
            $("#xmwjgl_xmgl_jdForm label:last").css('display', 'none');
            $("#xmwjgl_xmgl_addjdsj").css("display", 'none');
            $("#xmwjgl_xmgl_AddModalLable span").text("修改项目");
            $("#xmwjgl_xmgl_dwForm").css('display', 'none');
            $("#xmwjgl_xmgl_dlForm").css('display', 'none');
            $("#xmwjgl_xmgl_kzwForm").css('display', 'none');
            $("#xmwjgl_xmgl_zlxForm").css('display', 'none');
            $("#xmwjgl_xmgl_parentForm").css('display', 'none');
            $("#xmwjgl_xmgl_kzwzlxTable").css('display', 'none');
            $("#xmwjgl_xmgl_bzForm").css('display', 'none');
            $("#xmwjgl_xmgl_fksjForm").css('display', 'none');
            $('#xmwjgl_xmgl_AddModal').modal('show');
        }
        else if (NodePath[NodePath.length - 1].level == 2) {
            DropList_fzr("xmwjgl_xmgl_adddlfzr", "dl");
            $("#xmwjgl_xmgl_adddlmc").val(NodePath[2].name);
            $("#xmwjgl_xmgl_xmForm").css('display', 'none');
            $("#xmwjgl_xmgl_jdForm").css("display", 'none');
            $("#xmwjgl_xmgl_addjdsj").css("display", 'none');
            $("#xmwjgl_xmgl_AddModalLable span").text("修改段落");
            $("#xmwjgl_xmgl_dwForm").css('display', 'none');
            $("#xmwjgl_xmgl_kzwForm").css('display', 'none');
            $("#xmwjgl_xmgl_zlxForm").css('display', 'none');
            $("#xmwjgl_xmgl_parentForm").css('display', 'none');
            $("#xmwjgl_xmgl_kzwzlxTable").css('display', 'none');
            $("#xmwjgl_xmgl_bzForm").css('display', 'none');
            $("#xmwjgl_xmgl_fksjForm").css('display', 'none');
            $('#xmwjgl_xmgl_AddModal').modal('show');
        }
        else {
            swal("操作提示", "请选择[项目],[段落]进行修改", "warning");
        }
    });
});

//删除按钮
$(function () {
    $("#xmwjgl_xmgl_btn_delete").click(function () {
        var treeObj = $.fn.zTree.getZTreeObj("BLtree");
        var nodes = treeObj.getSelectedNodes();
        if (nodes.length != 0 && nodes[0].level == 0) {
            swal({
                title: "操作提示",
                text: "您确认要删除[" + nodes[0].name + "],项目吗? \n 删除之后记录无法恢复！",
                type: "warning",
                cancelButtonText: "取消",
                confirmButtonText: "是的，执行删除",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                closeOnConfirm: true
            }, function () {
                $.ajax({
                    url: '/XMWJGL/DeleteXM',
                    data: { "xmmc": nodes[0].name, "xmid": nodes[0].id },
                    dataType: 'json',
                    type: 'post',
                    traditional: true,
                    success: function (data) {
                        switch (data) {
                            case "NoUser":
                                swal("操作提示", "登录过期，请重新登录", "warning");
                                break;
                            case "NoPermission":
                                swal("操作提示", "您不具有操作权限", "warning");
                                break;
                            case "exist":
                                swal("操作提示", "该段已存在，请重新输入", "warning");
                                break;
                            case "error":
                                swal("操作提示", "数据处理出现错误", "warning");
                                break;
                            case "success":
                                treeObj.removeChildNodes(nodes[0]);
                                treeObj.removeNode(nodes[0]);
                                //null表示添加到根目录
                                swal("操作提示!", '项目: [' + nodes[0].name + '] 删除成功！', "success");
                                //$.globalMessenger().post({
                                //    message: '项目:(' + nodes[0].name + ')删除成功！',
                                //    hideAfert: 2,
                                //    type: '',
                                //    id: "Only-one-message",
                                //    showCloseButton: true,
                                //    hideOnNavigate: true,
                                //    scrollTo: true
                                //});
                                break;
                        }
                    },
                    error: function () {
                        swal("警告", "数据传输出错或超时！", "error");
                    }
                });
            });
        } else {
            swal("警告", "请选在一个项目进行删除！", "warning");
        }
    });
});

//模拟框关闭时清空输入
$(function () {
    $('#xmwjgl_xmgl_AddModal').on('hidden.bs.modal', function (e) {
        $("#xmwjgl_xmgl_AddForm input").val("");
        $("#xmwjgl_xmgl_AddForm select").val("");
    });
});

//加载负责人下拉栏
function DropList_fzr(SelectList_id, type) {
    $.get("/XMWJGL/AddDropFzr", { type: type }, function (data) {
        if (data == "NoUser") {
            swal("操作提示", "登录过期，请重新登录", "warning");
        } else {
            eval("data", data);
            var dll = $("#" + SelectList_id + "");
            dll.empty();
            $.each(data, function (index, item) {
                dll.append($('<option/>', {
                    value: item.ryid,
                    text: item.jgrymc
                }));
            });
        }
    });
}

//新建目录提交按钮
$(function () {
    $("#xmwjgl_xmgl_Submit").click(function () {
        switch ($("#xmwjgl_xmgl_AddModalLable span").text()) {
            case "新建项目":
                Add_xm_submit();
                break;
            case "添加单位":
                Add_dw_submit();
                break;
            case "添加段落":
                Add_dl_submit();
                break;
            case "添加控制网类型":
                Add_kzwlx_submit();
                break;
            case "添加控制网子类型":
                Add_kzwzlx_submit();
                break;
            case "修改项目":
                Edit_xm_submit();
            case "修改段落":
                Edit_dl_submit();
                break;
            default:
                break;

        }
    });
});
//添加项目按钮
$(function () {
    $("#xmwjgl_xmgl_btn_addxm").click(function () {
        $("#xmwjgl_xmgl_xmForm").css('display', '');
        $("#xmwjgl_xmgl_dwForm").css('display', '');
        $("#xmwjgl_xmgl_dlForm").css('display', '');
        $("#xmwjgl_xmgl_kzwForm").css('display', '');
        $("#xmwjgl_xmgl_zlxForm").css('display', '');
        $("#xmwjgl_xmgl_parentForm").css('display', '');
        $("#xmwjgl_xmgl_bzForm").css('display', '');
        $("#xmwjgl_xmgl_kzwzlxTable").css('display', '');
        $("#xmwjgl_xmgl_fksjForm").css('display', '');
        $("#xmwjgl_xmgl_addjd").attr("disabled", false);
        $("#xmwjgl_xmgl_jdForm").css('display', '');
        $("#xmwjgl_xmgl_jdForm label:last").css('display', '');
        $("#xmwjgl_xmgl_addjdsj").css("display", '');
        $("#xmwjgl_xmgl_addxmmc").val("");
        $("#xmwjgl_xmgl_jdForm").val("");
        xm_add();
    });
});

function isPositiveNum(s) {//是否为正整数  
    var re = /^[0-9]*[1-9][0-9]*$/;
    return re.test(s);
}
//修改项目提交
function Edit_xm_submit() {
    var xmmc = $("#xmwjgl_xmgl_addxmmc").val();
    var fzrid = $("#xmwjgl_xmgl_addxmfzr").val();
    var jdmc = $("#xmwjgl_xmgl_addjd").css("disabled", false).val();
    var treeObj = $.fn.zTree.getZTreeObj("BLtree");
    var nodes = treeObj.getSelectedNodes();
    var xmid = nodes[0].id;
    if (xmmc != "" && fzrid != "") {
        $.ajax({
            url: '/XMWJGL/EditXM',
            data: { "xmmc": xmmc, "fzrid": fzrid, "xmid": xmid, "jdmc": jdmc },
            datatype: 'json',
            type: 'post',
            traditional: true,
            success: function (data) {
                switch (data) {
                    case "NoUser":
                        swal("操作提示", "登录过期，请重新登录", "warning");
                        break;
                    case "NoPermission":
                        swal("操作提示", "您不具有操作权限", "warning");
                        break;
                    case "exist":
                        swal("操作提示", "该项目已存在，请重新输入", "warning");
                        break;
                    case "error":
                        swal("操作提示", "数据处理出现错误", "warning");
                        break;
                    default:
                        var item_node = eval('(' + data + ')');

                        var treeObj = $.fn.zTree.getZTreeObj("BLtree");
                        var node = treeObj.getNodeByParam("id", item_node[0].id, null);
                        node.name = item_node[0].name;
                        treeObj.updateNode(node);
                        //null表示添加到根目录
                        //swal("操作提示!", "添加成功!", "success");
                        $.globalMessenger().post({
                            message: '项目:(' + node.name + ')修改成功！',
                            hideAfert: 2,
                            type: '',
                            id: "Only-one-message",
                            showCloseButton: true,
                            hideOnNavigate: true,
                            scrollTo: true
                        });
                        break;
                }
            },
            error: function () {
                swal("警告", "数据传输出错或超时！", "error");
            }
        });
    }
}

function Edit_dl_submit() {
    var dlmc = $("#xmwjgl_xmgl_adddlmc").val();
    var dlfzrid = $("#xmwjgl_xmgl_adddlfzr").val();
    var treeObj = $.fn.zTree.getZTreeObj("BLtree");
    var nodes = treeObj.getSelectedNodes();
    var dlid = nodes[0].id;
    if (dlmc != "" && dlfzrid != "") {
        $.ajax({
            url: '/XMWJGL/EditDL',
            data: { "dlmc": dlmc, "dlfzrid": dlfzrid, "dlid": dlid },
            datatype: 'json',
            type: 'post',
            traditional: true,
            success: function (data) {
                switch (data) {
                    case "NoUser":
                        swal("操作提示", "登录过期，请重新登录", "warning");
                        break;
                    case "NoPermission":
                        swal("操作提示", "您不具有操作权限", "warning");
                        break;
                    case "exist":
                        swal("操作提示", "该段已存在，请重新输入", "warning");
                        break;
                    case "error":
                        swal("操作提示", "数据处理出现错误", "warning");
                        break;
                    default:
                        var item_node = eval('(' + data + ')');

                        var treeObj = $.fn.zTree.getZTreeObj("BLtree");
                        var node = treeObj.getNodeByParam("id", item_node[0].id, null);
                        node.name = item_node[0].name;
                        treeObj.updateNode(node);
                        //null表示添加到根目录
                        //swal("操作提示!", "添加成功!", "success");
                        $.globalMessenger().post({
                            message: '段落:(' + node.name + ')修改成功！',
                            hideAfert: 2,
                            type: '',
                            id: "Only-one-message",
                            showCloseButton: true,
                            hideOnNavigate: true,
                            scrollTo: true
                        });
                        break;
                }
            },
            error: function () {
                swal("警告", "数据传输出错或超时！", "error");
            }
        });
    }
}


//项目提交
function Add_xm_submit() {
    var xmmc = $("#xmwjgl_xmgl_addxmmc").val();
    //var xmfzrmc = $("#xmwjgl_xmgl_addxmfzr").text();
    var xmfzrid = $("#xmwjgl_xmgl_addxmfzr").val();
    var jdmc = $("#xmwjgl_xmgl_addjd").val();
    var time = $("#xmwjgl_xmgl_addjdsj").val();
    var fksj = $("#xmwjgl_xmgl_fksj").val();
    //var bz = $("#xmwjgl_xmgl_bz").val();
    if (xmmc != "" && xmfzrid != "" && jdmc != "" && time != "" && isPositiveNum(fksj) == true) {
        $.ajax({
            url: '/XMWJGL/AddXM',
            data: $("#xmwjgl_xmgl_AddForm").serialize(),
            datatype: 'json',
            type: 'post',
            traditional: true,
            success: function (data) {
                switch (data) {
                    case "NoUser":
                        swal("操作提示", "登录过期，请重新登录", "warning");
                        break;
                    case "NoPermission":
                        swal("操作提示", "您不具有操作权限", "warning");
                        break;
                    case "exist":
                        swal("操作提示", "该项目已存在，请重新输入", "warning");
                        break;
                    default:
                        var item_node = eval('(' + data + ')');
                        var treeObj = $.fn.zTree.getZTreeObj("BLtree");
                        var node = treeObj.getNodeByParam("id", item_node[0].pId, null);
                        var newNode = { id: item_node[0].id, pId: item_node[0].pId, name: xmmc + "-" + jdmc };
                        //null表示添加到根目录
                        treeObj.addNodes(node, newNode);
                        //swal("操作提示!", "添加成功!", "success");
                        $.globalMessenger().post({
                            message: '项目:(' + xmmc + "-" + jdmc + ')—添加成功！',
                            hideAfert: 2,
                            type: '',
                            id: "Only-one-message",
                            showCloseButton: true,
                            hideOnNavigate: true,
                            scrollTo: true
                        });
                        break;
                }
            },
            error: function () {
                swal("警告", "数据传输出错或超时！", "error");
            }
        });
    } else {
        if (xmmc != "" && xmfzrid != "" && jdmc != "" && time != "" && isPositiveNum(fksj) == false) {
            swal("操作提示", "请正确输入反馈天数", "warning");
        } else {
            swal("操作提示", "请输入完整项目信息", "warning");
        }
    }
}

//单位提交
function Add_dw_submit() {
    var dwmc = $("#xmwjgl_xmgl_adddw").find('option:selected').text();
    var dwid = $("#xmwjgl_xmgl_adddw").find('option:selected').val();
    $("#xmwjgl_xmgl_addparentId").css("display", "");
    if (dwid != "" && $("#xmwjgl_xmgl_addparentId").val() != "") {
        $.ajax({
            url: '/XMWJGL/AddDW',
            data: $("#xmwjgl_xmgl_AddForm").serialize(),
            datatype: 'json',
            type: 'post',
            traditional: true,
            success: function (data) {
                switch (data) {
                    case "NoUser":
                        swal("操作提示", "登录过期，请重新登录", "warning");
                        break;
                    case "NoPermission":
                        swal("操作提示", "您不具有操作权限", "warning");
                        break;
                    case "exist":
                        swal("操作提示", "该单位已存在请重新选择", "warning");
                        break;
                    default:
                        var item_node = eval('(' + data + ')');
                        var treeObj = $.fn.zTree.getZTreeObj("BLtree");
                        var node = treeObj.getNodeByParam("id", item_node[0].pId, null);
                        var newNode = { id: item_node[0].id, pId: item_node[0].pId, name: dwmc };
                        //添加到指定的目录
                        treeObj.addNodes(node, newNode);
                        //swal("操作提示!", "添加成功!", "success");
                        $.globalMessenger().post({
                            message: '单位:(' + dwmc + ')添加成功！',
                            hideAfert: 2,
                            type: '',
                            id: "Only-one-message",
                            showCloseButton: true,
                            hideOnNavigate: true,
                            scrollTo: true
                        });
                        break;
                }
            },
            error: function () {
                swal("警告", "数据传输出错或超时！", "error");
            }
        });
    } else {
        swal("操作提示", "请输入完整信息", "warning");
    }
    $("#xmwjgl_xmgl_addparentId").css("display", "none");
}
//段落、小队提交
function Add_dl_submit() {
    var dlmc = $("#xmwjgl_xmgl_adddlmc").val();
    var fzrid = $("#xmwjgl_xmgl_adddlfzr").find('option:selected').val();
    $("#xmwjgl_xmgl_addparentId").css("display", "");
    if (dlmc != "" && fzrid != "") {
        $.ajax({
            url: '/XMWJGL/AddDL',
            data: $("#xmwjgl_xmgl_AddForm").serialize(),
            datatype: 'json',
            type: 'post',
            traditional: true,
            success: function (data) {
                switch (data) {
                    case "NoUser":
                        swal("操作提示", "登录过期，请重新登录", "warning");
                        break;
                    case "NoPermission":
                        swal("操作提示", "您不具有操作权限", "warning");
                        break;
                    case "exist":
                        swal("操作提示", "该段落已存在请重新选择", "warning");
                        break;
                    default:
                        var item_node = eval('(' + data + ')');
                        var treeObj = $.fn.zTree.getZTreeObj("BLtree");
                        var node = treeObj.getNodeByParam("id", item_node[0].pId, null);
                        var newNode = { id: item_node[0].id, pId: item_node[0].pId, name: dlmc };
                        //添加到指定的目录
                        treeObj.addNodes(node, newNode);
                        //swal("操作提示!", "添加成功!", "success");
                        $.globalMessenger().post({
                            message: '段落:(' + dlmc + ')添加成功！',
                            hideAfert: 2,
                            type: '',
                            id: "Only-one-message",
                            showCloseButton: true,
                            hideOnNavigate: true,
                            scrollTo: true
                        });
                        break;
                }
            },
            error: function () {
                swal("警告", "数据传输出错或超时！", "error");
            }
        });
    } else {
        swal("操作提示", "请输入完整信息", "warning");
    }
    $("#xmwjgl_xmgl_addparentId").css("display", "none");
}
//控制网类型提交
function Add_kzwlx_submit() {
    var kzwid = $("#xmwjgl_xmgl_addkzw").find('option:selected').val();
    var kzwmc = $("#xmwjgl_xmgl_addkzw").find('option:selected').text();
    $("#xmwjgl_xmgl_addparentId").css("display", "");
    if (kzwid != "") {
        $.ajax({
            url: '/XMWJGL/AddKZWLX',
            data: $("#xmwjgl_xmgl_AddForm").serialize(),
            datatype: 'json',
            type: 'post',
            traditional: true,
            success: function (data) {
                switch (data) {
                    case "NoUser":
                        swal("操作提示", "登录过期，请重新登录", "warning");
                        break;
                    case "NoPermission":
                        swal("操作提示", "您不具有操作权限", "warning");
                        break;
                    case "exist":
                        swal("操作提示", "该控制网已存在请重新选择", "warning");
                        break;
                    default:
                        var item_node = eval('(' + data + ')');
                        var treeObj = $.fn.zTree.getZTreeObj("BLtree");
                        var node = treeObj.getNodeByParam("id", item_node[0].pId, null);
                        var newNode = { id: item_node[0].id, pId: item_node[0].pId, name: kzwmc };
                        //添加到指定的目录
                        treeObj.addNodes(node, item_node);
                        //swal("操作提示!", "添加成功!", "success");
                        $.globalMessenger().post({
                            message: '控制网:(' + kzwmc + ')添加成功！',
                            hideAfert: 2,
                            type: '',
                            id: "Only-one-message",
                            showCloseButton: true,
                            hideOnNavigate: true,
                            scrollTo: true
                        });
                        break;
                }
            },
            error: function () {
                swal("警告", "数据传输出错或超时！", "error");
            }
        });
    } else {
        swal("操作提示", "请输入完整信息", "warning");
    }
    $("#xmwjgl_xmgl_addparentId").css("display", "none");
}
//控制网子类型提交
function Add_kzwzlx_submit() {
    var array = $("#xmwjgl_xmgl_zlxtable").bootstrapTable('getSelections');
    $("#xmwjgl_xmgl_addparentId").css("display", "");
    var pId = $("#xmwjgl_xmgl_addparentId").val();
    if (array.length > 0) {
        var list = [];
        for (var i = 0; i < array.length; i++) {
            list[i] = array[i].id;
        }
        $.ajax({
            url: '/XMWJGL/AddKZWZLX',
            data: { "ZLXID_List": list, "pId": pId },
            datatype: 'json',
            type: 'post',
            traditional: true,
            success: function (data) {
                switch (data) {
                    case "NoUser":
                        swal("操作提示", "登录过期，请重新登录", "warning");
                        break;
                    case "NoPermission":
                        swal("操作提示", "您不具有操作权限", "warning");
                        break;
                    case "exist":
                        swal("操作提示", "该控制网子类型已存在请重新选择", "warning");
                        break;
                    default:
                        var item_node = eval('(' + data + ')');
                        var treeObj = $.fn.zTree.getZTreeObj("BLtree");
                        var node = treeObj.getNodeByParam("id", item_node[0].pId, null);
                        //添加到指定的目录
                        treeObj.addNodes(node, item_node);
                        //swal("操作提示!", "添加成功!", "success");
                        $.globalMessenger().post({
                            message: item_node.length + '项控制网子类型，添加成功！',
                            hideAfert: 2,
                            type: '',
                            id: "Only-one-message",
                            showCloseButton: true,
                            hideOnNavigate: true,
                            scrollTo: true
                        });
                        break;
                }
            },
            error: function () {
                swal("警告", "数据传输出错或超时！", "error");
            }
        });
    } else {
        swal("操作提示", "请选择需要添加的控制网子类型", "warning");
    }
    $("#xmwjgl_xmgl_addparentId").css("display", "none");
}


//添加项目
function xm_add() {
    DropList_fzr("xmwjgl_xmgl_addxmfzr", "xm");
    $("#xmwjgl_xmgl_AddModalLable span").text("新建项目");
    $("#xmwjgl_xmgl_dwForm").css('display', 'none');
    $("#xmwjgl_xmgl_dlForm").css('display', 'none');
    $("#xmwjgl_xmgl_kzwForm").css('display', 'none');
    $("#xmwjgl_xmgl_zlxForm").css('display', 'none');
    $("#xmwjgl_xmgl_parentForm").css('display', 'none');
    $("#xmwjgl_xmgl_kzwzlxTable").css('display', 'none');
    $("#xmwjgl_xmgl_fksjForm").css('display', '');
    $('#xmwjgl_xmgl_AddModal').modal('show');
}
//添加单位模块
function dw_add() {
    //加载单位下拉栏
    $.get("/XMWJGL/AddDropDW", null, function (data) {
        eval("data", data);
        var dll = $("#xmwjgl_xmgl_adddw");
        dll.empty();
        $.each(data, function (index, item) {
            dll.append($('<option/>', {
                value: item.jgid,
                text: item.jgmc
            }));
        });
    });
    $("#xmwjgl_xmgl_AddModalLable span").text("添加单位");
    $("#xmwjgl_xmgl_xmForm").css('display', 'none');
    $("#xmwjgl_xmgl_jdForm").css('display', 'none');
    $("#xmwjgl_xmgl_dlForm").css('display', 'none');
    $("#xmwjgl_xmgl_kzwForm").css('display', 'none');
    $("#xmwjgl_xmgl_zlxForm").css('display', 'none');
    $("#xmwjgl_xmgl_bzForm").css('display', 'none');
    $("#xmwjgl_xmgl_parentForm").css('display', '');
    $("#xmwjgl_xmgl_kzwzlxTable").css('display', 'none');
    $("#xmwjgl_xmgl_fksjForm").css('display', 'none');
    $('#xmwjgl_xmgl_AddModal').modal('show');
}
//添加段落模块
function dlxd_add() {
    DropList_fzr("xmwjgl_xmgl_adddlfzr", "dl");
    $("#xmwjgl_xmgl_AddModalLable span").text("添加段落");
    $("#xmwjgl_xmgl_xmForm").css('display', 'none');
    $("#xmwjgl_xmgl_dwForm").css('display', 'none');
    $("#xmwjgl_xmgl_jdForm").css('display', 'none');
    $("#xmwjgl_xmgl_kzwForm").css('display', 'none');
    $("#xmwjgl_xmgl_zlxForm").css('display', 'none');
    $("#xmwjgl_xmgl_parentForm").css('display', '');
    $("#xmwjgl_xmgl_kzwzlxTable").css('display', 'none');
    $("#xmwjgl_xmgl_fksjForm").css('display', 'none');
    $('#xmwjgl_xmgl_AddModal').modal('show');
}
//添加控制网类型模块
function kzw_add() {
    $("#xmwjgl_xmgl_AddModalLable span").text("添加控制网类型");
    $("#xmwjgl_xmgl_xmForm").css('display', 'none');
    $("#xmwjgl_xmgl_dwForm").css('display', 'none');
    $("#xmwjgl_xmgl_jdForm").css('display', 'none');
    $("#xmwjgl_xmgl_dlForm").css('display', 'none');
    $("#xmwjgl_xmgl_zlxForm").css('display', 'none');
    $("#xmwjgl_xmgl_bzForm").css('display', 'none');
    $("#xmwjgl_xmgl_kzwzlxTable").css('display', 'none');
    $("#xmwjgl_xmgl_fksjForm").css('display', 'none');
    $("#xmwjgl_xmgl_parentForm").css('display', '');
    var PathNodes = GetPathNodes();
    var jdmc = PathNodes[0].name.split('-')[1];
    var selectItem = $("#xmwjgl_xmgl_addkzw");
    selectItem.empty();
    switch (jdmc) {
        case "初测":
            selectItem.append("<option value='" + 1 + "'>" + "平面控制网" + "</option>");
            selectItem.append("<option value='" + 2 + "'>" + "高程控制网" + "</option>");
            break;
        case "定测":
            selectItem.append("<option value='" + 1 + "'>" + "平面控制网" + "</option>");
            selectItem.append("<option value='" + 2 + "'>" + "高程控制网" + "</option>");
            break;
        case "施工":
            selectItem.append("<option value='" + 1 + "'>" + "平面控制网" + "</option>");
            selectItem.append("<option value='" + 2 + "'>" + "高程控制网" + "</option>");
            selectItem.append("<option value='" + 3 + "'>" + "独立控制网（隧道、桥梁）" + "</option>");
            selectItem.append("<option value='" + 4 + "'>" + "隧道洞内控制网" + "</option>");
            selectItem.append("<option value='" + 5 + "'>" + "CPIII控制网" + "</option>");
            break;
        case "运营":
            selectItem.append("<option value='" + 1 + "'>" + "平面控制网" + "</option>");
            selectItem.append("<option value='" + 5 + "'>" + "CPIII控制网" + "</option>");
            selectItem.append("<option value='" + 6 + "'>" + "线路水准基点控制网" + "</option>");
            selectItem.append("<option value='" + 7 + "'>" + "线上加密水准网" + "</option>");
            selectItem.append("<option value='" + 8 + "'>" + "隧道洞内控制网" + "</option>");
            break;
    }
    $('#xmwjgl_xmgl_AddModal').modal('show');
}
//添加控制网子类型
function zlx_add() {
    $("#xmwjgl_xmgl_AddModalLable span").text("添加控制网子类型");
    $("#xmwjgl_xmgl_xmForm").css('display', 'none');
    $("#xmwjgl_xmgl_jdForm").css('display', 'none');
    $("#xmwjgl_xmgl_dwForm").css('display', 'none');
    $("#xmwjgl_xmgl_dlForm").css('display', 'none');
    $("#xmwjgl_xmgl_kzwForm").css('display', 'none');
    $("#xmwjgl_xmgl_zlxForm").css('display', 'none');
    $("#xmwjgl_xmgl_bzForm").css('display', 'none');
    $("#xmwjgl_xmgl_kzwzlxTable").css('display', '');
    $("#xmwjgl_xmgl_parentForm").css('display', '');
    $("#xmwjgl_xmgl_fksjForm").css('display', 'none');
    kzwzlx_table();
    $('#xmwjgl_xmgl_AddModal').modal('show');
}

//加载控制网子类型表格
function kzwzlx_table() {
    var jdmc = GetPathNodes()[0].name.split('-')[1];
    var kzwlx = $("#xmwjgl_xmgl_addparentName").val();
    if (jdmc != "" && kzwlx != "") {
        $.ajax({
            data: { "jdmc": jdmc, "kzwlx": kzwlx },
            type: "get",
            url: '/XMWJGL/GetKZWZLX_Table',
            success: function (data) {
                var Jsondata = eval('(' + data + ')');
                $("#xmwjgl_xmgl_zlxtable").bootstrapTable('destroy').bootstrapTable({
                    //'destroy' 是必须要加的==作用是加载服务器数据，初始化表格的内容Destroy the bootstrap table.
                    data: Jsondata,
                    dataType: 'json',
                    //data_locale: "zh-US", //转换中文 但是没有什么用处
                    striped: true, //是否显示行间隔色    
                    pagination: true,//是否显示分页（*）    
                    sidePagination: "client",//分页方式：client客户端分页，server服务端分页（*）    
                    pageNumber: 1, //初始化加载第一页，默认第一页    
                    pageSize: 10,//每页的记录行数（*）    
                    pageList: [10, 20, 30],//可供选择的每页的行数（*）    
                    //cache: false,//是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）        
                    sortable: true, //是否启用排序    
                    sortOrder: "asc", //排序方式           
                    minimumCountColumns: 2, //最少允许的列数    
                    clickToSelect: true, //是否启用点击选中行    
                    //height: 500,//行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度    
                    uniqueId: "zlx", //每一行的唯一标识，一般为主键列       
                    detailView: false, //是否显示父子表
                    showHeader: true,
                    onLoadErrow: function () {
                        layer.msg("加载数据失败");
                    },
                    //uniqueId: 'user_id',  //获取当前行唯一的id 标示，作用于后面的  var rowData = $table.bootstrapTable('getRowByUniqueId', userid);
                    columns: [
                        {
                            checkbox: true
                        },
                        {
                            field: 'id',
                            title: 'ID',
                            visible: false
                        },
                        {
                            field: 'jd',
                            title: '项目阶段',
                            sortable: true
                        },
                        {
                            field: 'kzwlx',
                            title: '控制网类型',
                            sortable: true
                        },
                        {
                            field: 'zlx',
                            title: '控制网子类型',
                            sortable: true
                        },
                        {
                            field: 'dj',
                            title: '等级',
                            sortable: true
                        }
                    ],
                });
            },
            error: function (data) {
                swal("操作提示", "数据加载出现问题", "warning");
            }
        });
    } else {
        swal("操作提示", "数据或操作出现问题", "warning");
    }

}

//加载段落表
function getDltable() {
    var treeObj = $.fn.zTree.getZTreeObj("BLtree");
    var nodes = treeObj.getSelectedNodes();
    if (nodes.length != 1||nodes[0].level!=1) {
        swal("操作提示", "请重新选择有效数据", "warning");
        return;
    }
    var treeDwmc = nodes[0].name;
    var treeDwid = nodes[0].id;
    if (treeDwmc != "" && treeDwid != "") {
        $.ajax({
            data: { "treeDwmc": treeDwmc, "treeDwid": treeDwid },
            type: "get",
            url: '/XMWJGL/GetDlTable',
            success: function (data) {
                if (data == "error") {
                    swal("操作提示", "数据处理出现错误！", "warning");
                    return;
                }
                var Jsondata = eval('(' + data + ')');
                $("#xmwjgl_xmgl_tb").bootstrapTable('destroy').bootstrapTable({
                    //'destroy' 是必须要加的==作用是加载服务器数据，初始化表格的内容Destroy the bootstrap table.
                    data: Jsondata,
                    dataType: 'json',
                    method: 'get',//请求方式（*）    
                    toolbar: '#toolbar',//工具按钮用哪个容器    
                    striped: true,//是否显示行间隔色    
                    cache: false,//是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）    
                    pagination: true,//是否显示分页（*）    
                    sortable: true, //是否启用排序    
                    sortOrder: "asc",//排序方式    
                    pageNumber: 1, //初始化加载第一页，默认第一页    
                    pageSize: 20,//每页的记录行数（*）    
                    pageList: [20, 25, 50, 100],//可供选择的每页的行数（*）    
                    //search: false,//是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大    
                    strictSearch: true,
                    showColumns: false,//是否显示所有的列    
                    showRefresh: false,//是否显示刷新按钮    
                    minimumCountColumns: 1,//最少允许的列数    
                    clickToSelect: true,//是否启用点击选中行    
                    //height: 500,//行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度    
                    uniqueId: "id", //每一行的唯一标识，一般为主键列    
                    showToggle: true,     //是否显示详细视图和列表视图的切换按钮    
                    cardView: false,     //是否显示详细视图    
                    detailView: false,     //是否显示父子表
                    showHeader: true,
                    onLoadErrow: function () {
                        layer.msg("加载数据失败");
                    },
                    //uniqueId: 'user_id',  //获取当前行唯一的id 标示，作用于后面的  var rowData = $table.bootstrapTable('getRowByUniqueId', userid);
                    columns: [
                        {
                            field: 'id',
                            title: '段落ID',
                            visible: false
                        },
                        {
                            field: 'dlmc',
                            title: '段落名称',
                            sortable: true
                        },
                        {
                            field: 'fzrmc',
                            title: '负责人名称',
                            sortable: true
                        },
                        {
                            field: 'fzrid',
                            title: '负责人id',
                            visible: false,
                            sortable: true
                        }
                    ]
                });
            },
            error: function (data) {
                swal("操作提示", "数据加载出现问题", "warning");
            }
        });
    } else {
        swal("操作提示", "数据或操作出现问题", "warning");
    }

}


//树状图载入
$(function() {
    $.ajax({
        url: '/XMWJGL/GetTreeJason',
        data: "",
        dataType: 'json',
        type: 'post',
        traditional: true,
        success: function(data) {
            if (data != "NoUser") {
                var obj = eval('(' + data + ')');
                $.fn.zTree.init($("#BLtree"), setting, obj);
            } else {
                swal("操作提示", "登录过期，请重新登录", "warning");
            }

        }
    });
});



//zTree树状图设置参数
var setting = {
    view: {
        //addHoverDom: addHoverDom,
        //removeHoverDom: removeHoverDom,
        selectedMulti: false
    },
    //check: {
    //    enable: true
    //},
    data: {
        simpleData: {
            enable: true
        }
    },
    edit: {
        enable: false,
        drag: {
            isCopy: false,
            isMove: false
        }
    },
    callback: {
        onClick: zTreeOnClick
    }
};

//树结构点击事件
function zTreeOnClick(event, treeId, treeNode) {
    //alert(treeNode.tId + ", " + treeNode.name);
    var treeObj = $.fn.zTree.getZTreeObj("BLtree");
    var nodes = treeObj.getSelectedNodes();
    if (nodes[0].level == 1) {
        getDltable();
    } else {
        $("#xmwjgl_xmgl_cjmc").val("");
        $("#xmwjgl_xmgl_id").val(nodes[0].id);
        $("#xmwjgl_xmgl_pId").val(nodes[0].pId);
        $("#xmwjgl_xmgl_Level").val(nodes[0].level);
        GetTree($("#xmwjgl_xmgl_cjmc").val(), $("#xmwjgl_xmgl_id").val(), $("#xmwjgl_xmgl_pId").val(), $("#xmwjgl_xmgl_Level").val());
    }
   
};
//从zTree中获取当前路径
function GetFilePath() {
    var treeObj = $.fn.zTree.getZTreeObj("BLtree");
    var nodes = treeObj.getSelectedNodes();
    if (nodes.length > 0) {
        var path = nodes[0].getPath();
        var Url = "";
        for (var i = 0; i < path.length; i++) {
            Url += path[i].id + "%2F";
        }
        return Url;
    }
    return undefined;
}
//从zTree中获取选中节点的节点路径
function GetPathNodes() {
    var treeObj = $.fn.zTree.getZTreeObj("BLtree");
    var nodes = treeObj.getSelectedNodes();
    if (nodes.length > 0) {
        var NodesArray = nodes[0].getPath();
        return NodesArray;
    }
    return 0;
}
//初始化日期控件
$(function () {
    $('#xmwjgl_xmgl_addjdsj').datetimepicker({
        format: 'yyyy-mm-dd',
        language: 'zh-CN',
        todayBtn: true,
        minView: "month", //选择日期后，不会再跳转去选择时分秒 
        autoclose: true
    });
    var myDate = new Date();
    $("#xmwjgl_xmgl_addjdsj").val(myDate.getFullYear() + "-" + (myDate.getMonth() + 1) + "-" + myDate.getDate());
});