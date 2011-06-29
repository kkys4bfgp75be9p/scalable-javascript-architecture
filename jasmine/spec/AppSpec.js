describe("app", function() {

  it("should be able to register a module", function() {
    
	app.register("test-module", function(sandbox){
		return {
			init: function(){
				this.started = true;
			},
			
			destroy: function(){
				this.started = false;
			}
		}
	})

	expect(typeof app.getModuleData("test-module")).toEqual("object");

  });

  describe("when a module starts", function() {
    beforeEach(function() {

		app.register("test-module", function(sandbox){
			return {
				init: function(){
					this.started = true;
				},

				destroy: function(){
					this.started = false;
				}
			}
		})
		
		app.start("test-module");	

    });

    it("should call the modules init method", function() {
      expect(app.getModuleData("test-module").instance.started).toBe(true);
    });

  });

  describe("when a module stops", function() {
    beforeEach(function() {

		app.register("test-module", function(sandbox){
			return {
				init: function(){
					this.started = true;
				},

				destroy: function(){
					this.started = false;
				}
			}
		})
		
		app.stop("test-module");

    });

    it("should call the modules destroy method", function() {
      expect(app.getModuleData("test-module").instance).toBeNull();
    });

  });


});